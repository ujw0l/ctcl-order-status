<?php
/**
 * Plugin Name:       CTCL Order Status
 * Description:      Check Order status for Customer
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ctcl-order-status
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_ctcl_order_status_block_init() {
	register_block_type( __DIR__ . '/build',
	array('attributes'  => array( 
		'apiUrl'=>["type"=>'string','default'=>rest_url( 'custom/v1/submit/' )],
		'fontColor'=>['type'=>'string','default'=>'rgba(255,255,255,1)'],
		'buttonColor'=>['type'=>'string','default'=>'rgba(61,148,218,1)']

	) ));
}
add_action( 'init', 'create_block_ctcl_order_status_block_init' );


// Define a function to handle the endpoint request
function custom_post_endpoint_handler( $request ) {


    // Retrieve data from the request
    $orderNumber = sanitize_text_field( $request->get_param( 'orderNumber' ) );
    $email = sanitize_email( $request->get_param( 'email' ) );

    // Perform some action with the data
    // For example, validate and save the data or use it in some other way
	
    if ( empty(  $orderNumber  ) || empty( $email ) ) {
        return new WP_Error( 'missing_data', 'Order Number and Email are required', array( 'status' => 422 ) );
    }

	global $wpdb;

   $detail = 	$wpdb->get_var( $wpdb->prepare( "SELECT orderDetail from {$wpdb->prefix}ctclOrders  where  orderId = %d", $orderNumber) );

   $vendorNote  = 	$wpdb->get_var( $wpdb->prepare( "SELECT vendorNote from {$wpdb->prefix}ctclOrders  where  orderId = %d", $orderNumber) );

   $prodDetail = json_decode($detail,true);
   
   if($prodDetail['checkout-email-address'] == $email):
	
	if(empty($vendorNote)):

	$note =__("No update available.","ctcl-order-status");
	else:
	$note =  $vendorNote;
	endif;
   else:
    $note = '';
   endif;
 

    // Example response
    $response = !empty($note) ? array(
        'status' => 'success',
		'note'=>$note,
    ):array(
		'status'=> 'fail',
		"note"=> __("Either email or order number is invalid","ctcl-order-status"),
	);

    return rest_ensure_response( $response );

}



// Register the custom endpoint
function register_custom_post_rest_endpoint() {
    register_rest_route(
        'custom/v1', // Namespace
        '/submit/',  // Route
        array(
            'methods'   => 'POST',   // Request method
            'callback'  => 'custom_post_endpoint_handler', // Callback function
        )
    );
}
add_action( 'rest_api_init', 'register_custom_post_rest_endpoint' );
