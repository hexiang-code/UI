import { LAppLive2DManager } from './LAppLive2DManager'
import { L2DTargetPoint, L2DViewMatrix, L2DMatrix44 } from './Live2DFramework'
import { LAppDefine, changeModelPath } from './LAppDefine'
import { MatrixStack } from './MatrixStack'
var thisRef = window;

window.onerror = function (msg, url, line) {
  var errmsg = "file:" + url + "<br>line:" + line + " " + msg;
  l2dError(errmsg);
}

function startLive2d(canvas, modelPath) {
  if (modelPath) changeModelPath(modelPath)
  thisRef.platform = window.navigator.platform.toLowerCase();

  thisRef.live2DMgr = new LAppLive2DManager();

  thisRef.isDrawStart = false;

  thisRef.gl = null;
  thisRef.canvas = null;

  thisRef.dragMgr = null; /*new L2DTargetPoint();*/
  thisRef.viewMatrix = null; /*new L2DViewMatrix();*/
  thisRef.projMatrix = null; /*new L2DMatrix44()*/
  thisRef.deviceToScreen = null; /*new L2DMatrix44();*/

  thisRef.drag = false;
  thisRef.oldLen = 0;

  thisRef.lastMouseX = 0;
  thisRef.lastMouseY = 0;

  thisRef.isModelShown = false;


  initL2dCanvas.call(window, canvas);


  init.call(window)
}

function initL2dCanvas(canvas) {

  thisRef.canvas = canvas instanceof HTMLElement ? canvas : document.getElementById(canvasId)


  if (thisRef.canvas.addEventListener) {
    thisRef.canvas.addEventListener("mousewheel", mouseEvent, false);
    // thisRef.canvas.addEventListener("click", mouseEvent, false);

    thisRef.canvas.addEventListener("mousedown", mouseEvent, false);
    thisRef.canvas.addEventListener("mousemove", mouseEvent, false);

    thisRef.canvas.addEventListener("mouseup", mouseEvent, false);
    thisRef.canvas.addEventListener("mouseout", mouseEvent, false);
    thisRef.canvas.addEventListener("contextmenu", mouseEvent, false);


    thisRef.canvas.addEventListener("touchstart", touchEvent, false);
    thisRef.canvas.addEventListener("touchend", touchEvent, false);
    thisRef.canvas.addEventListener("touchmove", touchEvent, false);

  }
}


function init() {
  let width = thisRef.canvas.width;
  let height = thisRef.canvas.height;

  thisRef.dragMgr = new L2DTargetPoint();


  let ratio = height / width;
  let left = LAppDefine.VIEW_LOGICAL_LEFT;
  let right = LAppDefine.VIEW_LOGICAL_RIGHT;
  let bottom = -ratio;
  let top = ratio;

  thisRef.viewMatrix = new L2DViewMatrix();


  thisRef.viewMatrix.setScreenRect(left, right, bottom, top);


  thisRef.viewMatrix.setMaxScreenRect(LAppDefine.VIEW_LOGICAL_MAX_LEFT,
    LAppDefine.VIEW_LOGICAL_MAX_RIGHT,
    LAppDefine.VIEW_LOGICAL_MAX_BOTTOM,
    LAppDefine.VIEW_LOGICAL_MAX_TOP);

  thisRef.viewMatrix.setMaxScale(LAppDefine.VIEW_MAX_SCALE);
  thisRef.viewMatrix.setMinScale(LAppDefine.VIEW_MIN_SCALE);

  thisRef.projMatrix = new L2DMatrix44();
  thisRef.projMatrix.multScale(1, (width / height));


  thisRef.deviceToScreen = new L2DMatrix44();
  thisRef.deviceToScreen.multTranslate(-width / 2.0, -height / 2.0);
  thisRef.deviceToScreen.multScale(2 / width, -2 / width);



  thisRef.gl = getWebGLContext();
  if (!thisRef.gl) {
    l2dError("Failed to create WebGL context.");
    return;
  }


  thisRef.gl.clearColor(0.0, 0.0, 0.0, 0.0);

  changeModel();

  startDraw();
}


function startDraw() {
  if (!thisRef.isDrawStart) {
    thisRef.isDrawStart = true;
    (function tick() {
      draw();

      let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;


      requestAnimationFrame(tick, thisRef.canvas);
    })();
  }
}


function draw() {
  // l2dLog("--> draw()");

  MatrixStack.reset();
  MatrixStack.loadIdentity();

  thisRef.dragMgr.update();
  thisRef.live2DMgr.setDrag(thisRef.dragMgr.getX(), thisRef.dragMgr.getY());


  thisRef.gl.clear(thisRef.gl.COLOR_BUFFER_BIT);

  MatrixStack.multMatrix(thisRef.projMatrix.getArray());
  MatrixStack.multMatrix(thisRef.viewMatrix.getArray());
  MatrixStack.push();

  for (var i = 0; i < thisRef.live2DMgr.numModels(); i++) {
    var model = thisRef.live2DMgr.getModel(i);

    if (model == null) return;

    if (model.initialized && !model.updating) {
      model.update();
      model.draw(thisRef.gl);

      if (!thisRef.isModelShown && i == thisRef.live2DMgr.numModels() - 1) {
        thisRef.isModelShown = !thisRef.isModelShown;
      }
    }
  }

  MatrixStack.pop();
}

function changeModel() {
  thisRef.isModelShown = false;

  thisRef.live2DMgr.reloadFlg = true;
  thisRef.live2DMgr.count++;
  thisRef.live2DMgr.changeModel(thisRef.gl);
}

function modelScaling(scale) {
  var isMaxScale = thisRef.viewMatrix.isMaxScale();
  var isMinScale = thisRef.viewMatrix.isMinScale();

  thisRef.viewMatrix.adjustScale(0, 0, scale);


  if (!isMaxScale) {
    if (thisRef.viewMatrix.isMaxScale()) {
      thisRef.live2DMgr.maxScaleEvent();
    }
  }

  if (!isMinScale) {
    if (thisRef.viewMatrix.isMinScale()) {
      thisRef.live2DMgr.minScaleEvent();
    }
  }
}

function modelTurnHead(event) {
  thisRef.drag = true;

  var rect = event.target.getBoundingClientRect();

  var sx = transformScreenX(event.clientX - rect.left);
  var sy = transformScreenY(event.clientY - rect.top);
  var vx = transformViewX(event.clientX - rect.left);
  var vy = transformViewY(event.clientY - rect.top);

  if (LAppDefine.DEBUG_MOUSE_LOG)
    l2dLog("onMouseDown device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

  thisRef.lastMouseX = sx;
  thisRef.lastMouseY = sy;

  thisRef.dragMgr.setPoint(vx, vy);


  thisRef.live2DMgr.tapEvent(vx, vy);
}

function followPointer(event) {
  var rect = event.target.getBoundingClientRect();

  var sx = transformScreenX(event.clientX - rect.left);
  var sy = transformScreenY(event.clientY - rect.top);
  var vx = transformViewX(event.clientX - rect.left);
  var vy = transformViewY(event.clientY - rect.top);

  if (LAppDefine.DEBUG_MOUSE_LOG)
    l2dLog("onMouseMove device( x:" + event.clientX + " y:" + event.clientY + " ) view( x:" + vx + " y:" + vy + ")");

  if (thisRef.drag) {
    thisRef.lastMouseX = sx;
    thisRef.lastMouseY = sy;

    thisRef.dragMgr.setPoint(vx, vy);
  }
}

function lookFront() {
  if (thisRef.drag) {
    thisRef.drag = false;
  }

  thisRef.dragMgr.setPoint(0, 0);
}

function mouseEvent(e) {
  e.preventDefault();

  if (e.type == "mousewheel") {

    if (e.clientX < 0 || thisRef.canvas.clientWidth < e.clientX ||
      e.clientY < 0 || thisRef.canvas.clientHeight < e.clientY) {
      return;
    }

    if (e.wheelDelta > 0) modelScaling(1.1);
    else modelScaling(0.9);


  } else if (e.type == "mousedown") {


    if ("button" in e && e.button != 0) return;

    modelTurnHead(e);

  } else if (e.type == "mousemove") {
    thisRef.drag = true
    followPointer(e);

  } else if (e.type == "mouseup") {


    if ("button" in e && e.button != 0) return;

    lookFront();

  } else if (e.type == "mouseout") {

    lookFront();

  } else if (e.type == "contextmenu") {

    changeModel();
  }

}

function touchEvent(e) {
  e.preventDefault();

  var touch = e.touches[0];

  if (e.type == "touchstart") {
    if (e.touches.length == 1) modelTurnHead(touch);
    // onClick(touch);

  } else if (e.type == "touchmove") {
    followPointer(touch);
    if (e.touches.length == 2) {
      var touch1 = e.touches[0];
      var touch2 = e.touches[1];
      var len = Math.pow(touch1.pageX - touch2.pageX, 2) + Math.pow(touch1.pageY - touch2.pageY, 2);
      if (thisRef.oldLen - len < 0) modelScaling(1.025);
      else modelScaling(0.975);

      thisRef.oldLen = len;
    }

  } else if (e.type == "touchend") {
    lookFront();
  }
}

function transformViewX(deviceX) {
  var screenX = thisRef.deviceToScreen.transformX(deviceX);
  return thisRef.viewMatrix.invertTransformX(screenX);
}

function transformViewY(deviceY) {
  var screenY = thisRef.deviceToScreen.transformY(deviceY);
  return thisRef.viewMatrix.invertTransformY(screenY);
}

function transformScreenX(deviceX) {
  return thisRef.deviceToScreen.transformX(deviceX);
}

function transformScreenY(deviceY) {
  return thisRef.deviceToScreen.transformY(deviceY);
}

function getWebGLContext() {
  var NAMES = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];

  for (var i = 0; i < NAMES.length; i++) {
    try {
      var ctx = thisRef.canvas.getContext(NAMES[i], { premultipliedAlpha: true });
      if (ctx) return ctx;
    }
    catch (e) {
      console.error(e)
     }
  }
  return null;
}



function l2dLog(msg) {
  if (!LAppDefine.DEBUG_LOG) return;


  console.log(msg);
}

function l2dError(msg) {
  if (!LAppDefine.DEBUG_LOG) return;

  l2dLog("<span style='color:red'>" + msg + "</span>");

  console.error(msg);
}

// 加载指定动作
const loadAction = ({name, index, priority = LAppDefine.PRIORITY_FORCE + 1}) => {
  let [ curModel ] = thisRef.live2DMgr.models
  if (curModel && name && typeof index !== undefined) {
    curModel.startMotion(name, index, priority)
  }
}

/**
 * 加载指定模型
 * @param {String} modelPath 模型路径 
 */
const loadModel = modelPath => {
  let [curModel] = thisRef.live2DMgr.models
  curModel && curModel.load(thisRef.gl, modelPath)
}

export { 
  startLive2d,
  getWebGLContext,
  loadAction,
  loadModel
}