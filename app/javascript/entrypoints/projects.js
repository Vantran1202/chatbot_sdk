console.log('Vite ⚡️ Rails')
console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

import '../controllers'
import * as boostrap from 'bootstrap'
import $ from 'jquery'

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import ResizeObserver from 'resize-observer-polyfill';
import 'gasparesganga-jquery-loading-overlay';
import Swal from 'sweetalert2';

// import * as Turbo from '@hotwired/turbo'
// Turbo.start()

import "@hotwired/turbo-rails"
Turbo.session.drive = false

// Import functions
import './functions/projects/toggle_menu_mobile';
import './functions/projects/sidebar';
import './functions/projects/toggle_nav_tab';
import './functions/projects/crawl';
import './functions/projects/chat_interface';
import './functions/projects/integrate';
import './functions/projects/chatbot';
import './functions/projects/delete';
import './functions/projects/global';
import './functions/projects/counter_character_textarea';
import './functions/projects/counter_character_upload_file';

// Set Global
window.ResizeObserver = ResizeObserver;
window.$ = $;
window.boostrap = boostrap;
window.Swal = Swal;

// initialize the page
window.addEventListener('load', (event) => {
    initPage();
});
window.addEventListener('turbo:render', (event) => {
    initPage();
});
function initPage() {
  // initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  })
}
