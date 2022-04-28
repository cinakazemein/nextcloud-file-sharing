/**
 * @copyright Copyright (c) 2016 Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 * @author Julius Härtl <jus@bitgrid.net>
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import './share'
import './sharebreadcrumbview'
import './style/sharebreadcrumb.scss'
import './collaborationresourceshandler.js'
import {forEach} from "underscore";
import {generateOcsUrl} from '@nextcloud/router'

// eslint-disable-next-line camelcase
__webpack_nonce__ = btoa(OC.requestToken)

window.OCA.Sharing = OCA.Sharing

$(function() {
	makeInaccessibleFoldersUnclickable();
});
$('.nav-icon-shareoverview').click(function (e) {
	makeInaccessibleFoldersUnclickable();
});

function makeInaccessibleFoldersUnclickable () {
	let unAccessiblePaths = [];
	$.ajax({
		url: generateOcsUrl('apps/files_sharing/api/v1/shares?format=json&shared_with_me=true&include_tags=true'),
		params: {
			format: "json",
			shared_with_me: true,
			include_tags: true,
		},
		type: 'GET',
		dataType: 'json', // added data type
		async: false,
		success: function (res) {
			const data = res.ocs.data;
			data.forEach(item => {
				if (item.is_accessible === false) {
					unAccessiblePaths.push(item.path);
				}
			});
		}
	});
	setTimeout(function () {
		let tds = document.querySelectorAll('#fileList .filename>a');
		tds.forEach(item => {
			// file a tag dont have dir query string so they are always not splitted and has one element
			let hrefSplitted = item.href.split('?dir=/');
			if (hrefSplitted.length > 1) {
				if (unAccessiblePaths.includes(hrefSplitted[1]) || unAccessiblePaths.includes('/' + hrefSplitted[1])) {
					item.style.pointerEvents = "none";
					item.style.cursor = "default";
					item.href = "#";
				}

			}
		})
	}, 2000)
}

