<?php
/**
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * @file
 */

// namespace MediaWiki\Extension\BlockChain;

class BlockChainHooks {

    
	public static function onParserFirstCallInit( Parser $parser ) {
		
		$parser->setHook( 'blockchain', [ self::class, 'renderBlockChain']);
	}


	public static function renderBlockChain( $input, array $args, Parser $parser, PPFrame $frame ) {
		
		$po = $parser->getOutput();
		$po->updateCacheExpiry( 0 );
		$po->addModuleStyles( 'ext.blockChain.styles' );
		$po->addModules( 'ext.blockChain' );
		
		
		$type = 0;
		if ( preg_match( "/^\s*type\s*=\s*(.*)/mi", $input, $matches ) ) {
			$type = htmlspecialchars( $matches[1] );
		} elseif ( !empty( $args['type'] ) ) {
			$type = intval( $args['type'] );
		}

		$output = '';
	 
		switch ( $type ) {
			case 0:
				$output = "<div class=\"cocos_blocks_list\" id=\"blockinfo\">";
				$output .= $input;
				$output .= "</div>";
				break;
			case 1:
				$output = "<div class=\"cocos_transaction_list\" id=\"transactioninfo\">";
				$output .= $input;
				$output .= "</div>";
				break;
			default:
				$output = "<div class=\"cocos_blocks_list\" id=\"blockinfo\">";
				$output .= $input;
				$output .= "</div>";
		}
		return $output;
	}

}
