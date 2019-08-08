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
					var blocks_html="<table style=\"width:100%\">";
					blocks.forEach(function(block){
						var {block_height,block_id,trx_count,witness_name,time} = block;
						// blocks_html+=`<li> <span class="block_height">${block_height}</span> <span class="block_id">${block_id}[${witness_name}]</span> <span class="block_time">${time}</span> </li>`;
					
						blocks_html+=`<tr> <td class="block_height">${block_height}</td> <td class="block_id">${block_id}</td><td>${witness_name}</td><td>${trx_count}</td> <td class="block_time">${time}</td> </tr>`;
		
					});
				
					blocks_html+="</table>";
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
						if( operations.length>5){
							operations.length=5;
						}
						var operations_html="<table style=\"width:100%\">";
						
						operations.forEach(function(item,index){
							operations_html+="<tr><td class=\"tran_block_id\">"+item.block_num + "</td><td class=\"tran_type_name\">"+item.type_name+"</td><td>"+item.parse_operations_text + "</td><td>"+item.parse_operations.fee + "</td><td>"+item.date + "</td></tr>";
							// operations_html+=`<tr><td>${item.block_num}</td>  <td>${item.type_name}</td> <td>${item.parse_operations_text}</td> <td>${item.parse_operations.fee}</td> <td>${item.date}</td></tr>`;
							// operations_html+=`<li>${item.block_num}${item.type_name}${item.parse_operations_text}${item.parse_operations.fee}${item.date}</li>`;
							// $(selector).appendChild(tr);
							// if(item.raw_data.new_options) $("."+op_class+" .new_options div").JSONView(item.raw_data.new_options,{ collapsed: true })
						});
						operations_html+="</table>";
						$(".cocos_transaction_list").html(operations_html);
						
					}
				}
			});
		}
	
	 
	});
 
}( jQuery, mediaWiki ) );
 
