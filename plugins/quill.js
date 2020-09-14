import Vue from "vue"
import Vue2Editor from "vue2-editor"
import { ImageDrop } from 'quill-image-drop-module';
import BlotFormatter from 'quill-blot-formatter';
import ImageCompress from 'quill-image-compress';
import MagicUrl from 'quill-magic-url';

Vue2Editor.Quill.register("modules/imageDrop", ImageDrop);
Vue2Editor.Quill.register('modules/blotFormatter', BlotFormatter);
Vue2Editor.Quill.register('modules/imageCompress', ImageCompress);
Vue2Editor.Quill.register('modules/magicUrl', MagicUrl);

Vue.use(Vue2Editor)