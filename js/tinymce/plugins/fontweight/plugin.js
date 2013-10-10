/**
 * plugin.js
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*global tinymce:true */

tinymce.PluginManager.add('textcolor', function(editor) {
	function getWeights() {
    var weights = {
      NEXA: ['light', 'normal', 'bold'],
      Lincoln: ['light', 'normal', 'bold']
    };
		return weights;
	}

	function renderColorPicker() {
		var self = this, weights, color, html, last, rows, cols, x, y, i;

		colors = getWeights();
    // <div id="mce_12-body" class="mce-container-body mce-stack-layout" style="width: 160px;"><div id="mce_13" class="mce-menu-item mce-menu-item-normal mce-first mce-stack-layout-item" tabindex="-1" role="menuitem" aria-pressed="false"><i class="mce-ico mce-i-none"></i>&nbsp;<span id="mce_13-text" class="mce-text" style="font-family:Convnexa">NEXA</span></div><div id="mce_14" class="mce-menu-item mce-menu-item-normal mce-last mce-stack-layout-item" tabindex="-1" role="menuitem" aria-pressed="false"><i class="mce-ico mce-i-none"></i>&nbsp;<span id="mce_14-text" class="mce-text" style="font-family:Conv_abrahamlincoln">Lincoln</span></div></div></div>
		html = '<div class="mce-container mce-panel mce-floatpanel mce-menu mce-menu-align" hidefocus="1" tabindex="-1" role="menu">';
		last = colors.length - 1;
		rows = editor.settings.textcolor_rows || 5;
		cols = editor.settings.textcolor_cols || 8;

		for (y = 0; y < rows; y++) {
			html += '<tr>';

			for (x = 0; x < cols; x++) {
				i = y * cols + x;

				if (i > last) {
					html += '<td></td>';
				} else {
					color = colors[i];
					html += (
						'<td>' +
							'<div id="' + ctrl._id + '-' + i + '"' +
								' data-mce-color="' + color.color + '"' +
								' role="option"' +
								' tabIndex="-1"' +
								' style="' + (color ? 'background-color: #' + color.color : '') + '"' +
								' title="' + color.text + '">' +
							'</div>' +
						'</td>'
					);
				}
			}

			html += '</tr>';
		}

		html += '</tbody></table>';

		return html;
	}

	function onPanelClick(e) {
		var buttonCtrl = this.parent(), value;

		if ((value = e.target.getAttribute('data-mce-color'))) {
			buttonCtrl.hidePanel();
			value = '#' + value;
			buttonCtrl.color(value);
			editor.execCommand(buttonCtrl.settings.selectcmd, false, value);
		}
	}

	function onButtonClick() {
		var self = this;

		if (self._color) {
			editor.execCommand(self.settings.selectcmd, false, self._color);
		}
	}

	editor.addButton('forecolor', {
		type: 'colorbutton',
		tooltip: 'Text color',
		selectcmd: 'ForeColor',
		panel: {
			html: renderColorPicker,
			onclick: onPanelClick
		},
		onclick: onButtonClick
	});

	editor.addButton('backcolor', {
		type: 'colorbutton',
		tooltip: 'Background color',
		selectcmd: 'HiliteColor',
		panel: {
			html: renderColorPicker,
			onclick: onPanelClick
		},
		onclick: onButtonClick
	});
});
