import {PanelBody,RangeControl, ColorPicker} from  '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	return (<>
		<div { ...useBlockProps() }>
			
			<fieldset id="ctcl-order-status-check-fieldset" >
				<legend>{__('Check Order Status','ctcl-order-status')}</legend>
				<div>
					<form id="ctcl-order-status-check">
					<label for='ctcl-email'> {__("Email Address :",'ctcl-order-status')} </label>
					<input id='ctcl-email'  type='email' />
					<br/>
					<br/>
					<label for='ctcl-order-number'> {__("Order Number : ",'ctcl-order-status')} </label>
					<input id="ctcl-order-number" type="Number" />
					<br/>
					<br/>
					<button  style={{color:attributes.fontColor,backgroundColor:attributes.buttonColor}} type='submit'> {__('Check','ctcl-order-status')} </button>
					</form>
				</div>
			</fieldset>

		</div >

		<InspectorControls>
<PanelBody>


<p>{__('Button Color','ctcl-floating-cart')}  </p>
<ColorPicker 

color={attributes.buttonColor}
onChange={val=> setAttributes({buttonColor:val})}
/>


<p>{__('Button Font Color','ctcl-floating-cart')}  </p>
<ColorPicker 

color={attributes.fontColor}
onChange={val=> setAttributes({fontColor:val})}
/>

</PanelBody>
</InspectorControls>

<div>



</div>
		</>
	);
}
