import { html } from 'lit-html';

import { withKnobs, text, boolean, radios } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


import '../lib/lwdc-layout-box';

import { customElement, LitElement, property, css } from 'lit-element';




//https://storybook.js.org/docs/formats/component-story-format/

const center = (storyFn: () => unknown) => html`<div style="margin: 64px 64px;">${storyFn()}</div>`;


//https://design.workday.com/tokens/assets/icons/icon-guidelines
export default {
	title: 'LitElement Workday Canvas Kit Web Components/Layout',
	component: 'lwdc-icon',
	decorators: [withKnobs, center]
};



export const boxLayoutStory = () => {
	return html` 
	<style>
		.demo-box {
			position: relative;
			box-sizing: border-box;
			min-height: 16px;
			margin-bottom: 16px;
			background: #005cb9;
			border: 1px solid #fff;
			border-radius: 2px;
			overflow: hidden;
			text-align: center;
			color: #fff;
		}
		.demo-box.demo-box-big {
 		   min-height: 64px;
		}
		h3 {
			font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
    		font-size: 16px;
    		margin: 0;
		    margin: 20px 0 8px;
    		padding: 0;
    		cursor: text;
    		position: relative;
    		color: #333333;
    		font-size: 20px;
		}
	</style>
	
	<h3>Resizing</h3>
	<div>
      <lwdc-box-row>
	 	<lwdc-box-col sm="2" md="5" lg="2" xl="1">
        	<div class="demo-box"></div>
		</lwdc-box-col>
		<lwdc-box-col sm="4" md="1" lg="2" xl="9" >
          	<div class="demo-box"></div>
        </lwdc-box-col>
        <lwdc-box-col sm="1" md="2" lg="2" xl="1" >
          	<div class="demo-box"></div>
        </lwdc-box-col>
        <lwdc-box-col sm="5" md="4" lg="6" xl="1" >
	      	<div class="demo-box"></div>
        </lwdc-box-col>
      </lwdc-box-row>
      
      <lwdc-box-row>
        <lwdc-box-col sm="3" md="11" lg="4" xl="1" >
	      	<div class="demo-box"></div>
        </lwdc-box-col>
        <lwdc-box-col sm="9" md="1" lg="8" xl="11" >
	      	<div class="demo-box"></div>
        </lwdc-box-col>
      </lwdc-box-row>
      
      <lwdc-box-row>
        <lwdc-box-col sm="5" md="4" lg="5" xl="2" >
	      	<div class="demo-box"></div>
        </lwdc-box-col>
        <lwdc-box-col sm="3" md="3" lg="2" xl="6" >
	      	<div class="demo-box"></div>
        </lwdc-box-col>
        <lwdc-box-col sm="4" md="6" lg="5" xl="4" >
	    	<div class="demo-box"></div>
        </lwdc-box-col>
      </lwdc-box-row>
	</div>
	
	<h3>Fluid</h3>
	<div>
		<lwdc-box-row>
			<lwdc-box-col position="11" >
				<div class="demo-box"></div>
			</lwdc-box-col>
			<lwdc-box-col position="1" >
				<div class="demo-box"></div>
			</lwdc-box-col>
		</lwdc-box-row>
	</div>	

	<h3>Offsets</h3>
	<div>
	<lwdc-box-row>
        <lwdc-box-col offset="11" position="1" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>
	</lwdc-box-row>
	<lwdc-box-row>
        <lwdc-box-col offset="10" position="2" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="9" position="3" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="8" position="4" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="7" position="5" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="6" position="6" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="5" position="7" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="4" position="8" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="3" position="9" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	   
	<lwdc-box-row>
        <lwdc-box-col offset="2" position="10" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>
	<lwdc-box-row>
        <lwdc-box-col offset="1" position="11" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>	     
	<lwdc-box-row>
        <lwdc-box-col position="12" >
	      	<div class="demo-box"></div>
		</lwdc-box-col>  
	</lwdc-box-row>		   
	</div>
	
	<h3>Auto</h3>
	<div>
		<lwdc-box-row>
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
		</lwdc-box-row>
		<lwdc-box-row>
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
		</lwdc-box-row>
	</div>

	<h3>Horizontal</h3>
	<div>
		<lwdc-box-row start>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col> 
		</lwdc-box-row>
		<lwdc-box-row center>	 
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>
		</lwdc-box-row>
		<lwdc-box-row end>  
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>  
		</lwdc-box-row>
	</div>

	<h3>Vertical</h3>
	<div>
		<lwdc-box-row top>
			<lwdc-box-col>
				<div class="demo-box demo-box-big"></div>
			</lwdc-box-col>
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col> 
		</lwdc-box-row>
		<lwdc-box-row middle>
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>	 
			<lwdc-box-col>
				<div class="demo-box demo-box-big"></div>
			</lwdc-box-col>			
		</lwdc-box-row>
		<lwdc-box-row bottom>  
			<lwdc-box-col>
				<div class="demo-box demo-box-big"></div>
			</lwdc-box-col>
			<lwdc-box-col>
				<div class="demo-box"></div>
			</lwdc-box-col>  
		</lwdc-box-row>
	</div>

	<h3>Distribution</h3>
	<div>
		<lwdc-box-row around>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col> 
		</lwdc-box-row>
		<lwdc-box-row between>  
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>
			<lwdc-box-col position="1">
				<div class="demo-box"></div>
			</lwdc-box-col>  
		</lwdc-box-row>
	</div>
	
	
	`;
}

boxLayoutStory.story = {
	name: 'Box Layout'
}

export const pageLayoutStory = () => {
	return html`<p/>`;
}

pageLayoutStory.story = {
	name: 'Page Layout'
}



