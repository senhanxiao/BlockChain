/**
 *  
 *
 * @author Steven Xiao
 * @license http://opensource.org/licenses/MIT MIT License
 */
( function ( $, mw ) {
	'use strict';
	var _configParams={
		ws_node_list:[
			// {url:"ws://47.93.62.96:8049",name:"COCOS3.0节点1"} ,
			{url:"ws://39.106.126.54:8049",name:"COCOS3.0节点2"} ,
		],
		networks:[
		 {
			core_asset:"COCOS",
			chain_id:"7d89b84f22af0b150780a2b121aa6c715b19261c8b7fe0fda3a564574ed7d3e9" 
		  }
		], 
		faucet_url:"http://47.93.62.96:8041",
		auto_reconnect:false,
		real_sub:true,
		check_cached_nodes_data:false
	};
	var blocks = [];
	var operations = [];
    
	try{
		if(typeof(Storage) != "undefined"){
			blocks = localStorage.getItem("blocks");
			if(blocks == null) {
				blocks=[];
			}
			else{
				blocks = JSON.parse(blocks);
				var blocks_html="<ul>";
					blocks.forEach(function(block){
						var {block_height,block_id,trx_count,witness_name,time} = block;
						blocks_html+="<li><span class='block_height'>"+block_height +"</span><span class='block_id'>"+block_id+"</span>"+
										  "<span class='block_witness_name'>"+witness_name+"</span>"+ 
										  "<span class='block_trx_count'>"+trx_count+"</span> "+
										  "<span class='block_time'>"+new Date(time).format('HH:mm:ss')+"</span>"+
										  "<div style='clear:both;'><\/div>"+
									  "</li>";
					});
				
					blocks_html+="</ul>";
				$(".cocos_blocks_list").html(blocks_html);	
			}
		}
	}
	catch {
		blocks=[];
	}
  	try{


		if(typeof(Storage) != "undefined"){
	
					operations = localStorage.getItem("operations");
					if(operations == null) {
						operations=[];
					}
					else{
						operations = JSON.parse(operations);
						var operations_html="<ul>";
						operations.forEach(function(item,index){
							
							operations_html+="<li>"+
							"<span class=\"tran_block_num\">"+item.block_num+"</span>"+
							"<span class=\"tran_type_name\">"+item.type_name+"</span>"+
							"<span class=\"tran_operations_text\">"+item.parse_operations_text+"</span>"+
							"<span class=\"tran_date\">"+new Date(item.date).format('HH:mm:ss')+"</span><div style=\"clear:both;\"></div></li>";
	});
						operations_html+="</ul>";
						$(".cocos_transaction_list").html(operations_html);
					}
			}
	}
	catch{
		operations=[];
	}
	 

	var bcx=new BCX(_configParams); 
	bcx.init({
		real_sub:true
	}).then(res=>{
	 
		if($(".cocos_blocks_list").length>0){
  			 bcx.subscribeToBlocks({
			isReqTrx:true,
			callback:function(res){
				// console.info("subscribeBlocks res",res);
				if(res.code==1){
					blocks.unshift(res.data);
					if(blocks.length>10){
						blocks.length=10; 
					}
						if(typeof(Storage) != "undefined"){
					localStorage.setItem("blocks", JSON.stringify(blocks));}
					var blocks_html="<ul>";
					blocks.forEach(function(block){
						var {block_height,block_id,trx_count,witness_name,time} = block;
						// blocks_html+=`<li> 
						//                   <span class="block_height">${block_height}</span> 
						// 				  <span class="block_id">${block_id}</span> 
						// 				  <span class="block_witness_name">${witness_name}</span> 
						// 				  <span class="block_trx_count">${trx_count}</span> 
						// 				  <span class="block_time">${new Date(time).format('HH:mm:ss')}</span>
						// 				  <div style=\"clear:both;\"><\/div>
						// 			  </li>`;
						blocks_html+="<li><span class='block_height'>"+block_height +"</span><span class='block_id'>"+block_id+"</span>"+
										  "<span class='block_witness_name'>"+witness_name+"</span>"+ 
										  "<span class='block_trx_count'>"+trx_count+"</span> "+
										  "<span class='block_time'>"+new Date(time).format('HH:mm:ss')+"</span>"+
										  "<div style='clear:both;'><\/div>"+
									  "</li>";
					});
				
					blocks_html+="</ul>";
					$(".cocos_blocks_list").html(blocks_html);		
				}
			}
		     });
	    }
		 
	 
		if($(".cocos_transaction_list").length>0) {
				
			bcx.subscribeToChainTranscation({
				callback:function(res){
					// console.info("subscribeToChainTranscation res",res);
					if(res.code==1){
						operations.unshift(res.data);
						if( operations.length>10){
							operations.length=10;
						}
							if(typeof(Storage) != "undefined"){
						localStorage.setItem("operations",JSON.stringify(operations));}
						var operations_html="<ul>";
						operations.forEach(function(item,index){
							// operations_html+=`<li>
							// <span class="tran_block_num">${item.block_num}<\/span>
							// <span class="tran_type_name">${item.type_name}<\/span>
							// <span class="tran_operations_text">${item.parse_operations_text}<\/span>
							// <span class="tran_date">${new Date(item.date).format('HH:mm:ss')}<\/span><div style=\"clear:both;\"><\/div><\/li>`;
						
							operations_html+="<li>"+
							"<span class=\"tran_block_num\">"+item.block_num+"</span>"+
							"<span class=\"tran_type_name\">"+item.type_name+"</span>"+
							"<span class=\"tran_operations_text\">"+item.parse_operations_text+"</span>"+
							"<span class=\"tran_date\">"+new Date(item.date).format('HH:mm:ss')+"</span><div style=\"clear:both;\"></div></li>";

						});
					 
						operations_html+="</ul>";
						$(".cocos_transaction_list").html(operations_html);
						
					}
				}
			});
		}
	
	 
	});
 
}( jQuery, mediaWiki ) );
 
