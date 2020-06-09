let LAppDefine = {


  DEBUG_LOG: false,
  DEBUG_MOUSE_LOG: false,
  DEBUG_DRAW_HIT_AREA : false, 
  DEBUG_DRAW_ALPHA_MODEL : false, 


  IS_ALLOW_RANDOM: true,

  VIEW_MAX_SCALE: 2,
  VIEW_MIN_SCALE: 0.8,

  VIEW_LOGICAL_LEFT: -1,
  VIEW_LOGICAL_RIGHT: 1,

  VIEW_LOGICAL_MAX_LEFT: -2,
  VIEW_LOGICAL_MAX_RIGHT: 2,
  VIEW_LOGICAL_MAX_BOTTOM: -2,
  VIEW_LOGICAL_MAX_TOP: 2,


  PRIORITY_NONE: 0,
  PRIORITY_IDLE: 1,
  PRIORITY_NORMAL: 2,
  PRIORITY_FORCE: 3,


    // BACK_IMAGE_NAME : "assets/image/back_class_normal.png",
  
    
    // MODEL_HARU : "assets/live2d/haru/haru.model.json",
    // MODEL_HARU_A : "assets/live2d/haru/haru_01.model.json",
    // MODEL_HARU_B : "assets/live2d/haru/haru_02.model.json",
    // MODEL_SHIZUKU : "assets/live2d/shizuku/shizuku.model.json",
    // MODEL_WANKO : "assets/live2d/wanko/wanko.model.json",
    
    
    MOTION_GROUP_TAP_BODY : "tap_body", 
    MOTION_GROUP_FLICK_HEAD : "flick_head", 
    MOTION_GROUP_PINCH_IN : "pinch_in", 
    MOTION_GROUP_PINCH_OUT : "pinch_out", 
    MOTION_GROUP_SHAKE : "shake", 
  
    
    HIT_AREA_HEAD : "head",
    HIT_AREA_BODY : "body",
  

  // MODEL_MURAKUMO : "murakumo/murakumo.model.json",
  MODEL_MURAKUMO: "/live-model/rem/rem.json",

  MOTION_GROUP_IDLE: "idle",
  MOTION_GROUP_TAP: "tap",
  MOTION_GROUP_TAP_EAR: "tap_ear",
  MOTION_GROUP_TAP_BUST: "tap_bust",


  HIT_AREA_HEAD: "head",
  HIT_AREA_BODY: "body",
  HIT_AREA_EAR_L: "ear_l",
  HIT_AREA_EAR_R: "ear_r",
  HIT_AREA_BUST: "bust"
};

const changeModelPath = modelPath => {
  LAppDefine.MODEL_MURAKUMO = modelPath
}

export { 
  LAppDefine,
  changeModelPath
}