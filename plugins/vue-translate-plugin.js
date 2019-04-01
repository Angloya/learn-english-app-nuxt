import Vue from 'vue'
import VueTranslate from 'vue-translate-plugin'

Vue.use(VueTranslate);
//https://www.npmjs.com/package/vue-translate-plugin
// var myComp = Vue.extend({
//     template: `<div>
//             {{ t('Hello World') }}
//             <span v-translate>How are you?</span>
//         </div>`,
    
//     mounted() {
//         // Define what language you want to use.
//         // This can be called in something like a header with a language selector menu
//         // Or any other case, doesn't need to be called in all components, but
//         // at least in one, so it sets the global language of the plugin
//     	this.$translate.setLang('es_DO');
//     },
 
//     // The translations itself, keyed by language or anything else you one
//     locales: {
//     	es_DO: {
//         	'Hello World': 'Hola Mundo',
//         	'How are you?': 'Como estás?'
//         }
//     }
// });
 
// var vm = new Vue({
//     el: '#app',
    
//     components: {myComp},
    
//     template: `<div>
//         <my-comp></my-comp>
//     </div>`
// });