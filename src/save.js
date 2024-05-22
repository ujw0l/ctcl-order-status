/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {


	return (
		<div { ...useBlockProps.save() }>

				<fieldset id="ctcl-order-status-check-fieldset" data-api-url={attributes.apiUrl} >
				<legend>{__('Check Order Status','ctcl-order-status')}</legend>
				<div  >
					<form id="ctcl-order-status-check">
					<label for='ctcl-email'> {__("Email Address :",'ctcl-order-status')} </label>
					<input id='ctcl-email'  required='required' type='email' />
					<br/>
					<br/>
					<label for='ctcl-order-number'> {__("Order Number : ",'ctcl-order-status')} </label>
					<input id="ctcl-order-number"  required='required' type="Number" />
					<br/>
					<br/>
					<button style={{color:attributes.fontColor,backgroundColor:attributes.buttonColor}} type='submit'> {__('Check','ctcl-order-status')} </button>
					</form>
				</div>
			</fieldset>
		</div>
	);
}
