export class LayoutRegions {
  public static readonly viewport = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Viewport Overlay Top");
      public static readonly left = Symbol("Viewport Overlay Left");
      public static readonly bottom = Symbol("Viewport Overlay Bottom");
      public static readonly right = Symbol("Viewport Overlay Right");
      public static readonly center = Symbol("Viewport Overlay Center");
    };
    public static readonly innerOverlay = class {
      public static readonly top = Symbol("Viewport Inner Overlay Top");
      public static readonly left = Symbol("Viewport Inner Overlay Left");
      public static readonly bottom = Symbol("Viewport Inner Overlay Bottom");
      public static readonly right = Symbol("Viewport Inner Overlay Right");
      public static readonly center = Symbol("Viewport Inner Overlay Center");
    };
    public static readonly top = Symbol("Viewport Top");
    public static readonly left = Symbol("Viewport Left");
    public static readonly bottom = Symbol("Viewport Bottom");
    public static readonly right = Symbol("Viewport Right");
    public static readonly center = Symbol("Viewport Center");
  };


  public static readonly application = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Application Overlay Top");
      public static readonly left = Symbol("Application Overlay Left");
      public static readonly bottom = Symbol("Application Overlay Bottom");
      public static readonly right = Symbol("Application Overlay Right");
      public static readonly center = Symbol("Application Overlay Center");
    };
    public static readonly innerOverlay = class {
      public static readonly top = Symbol("Application Inner Overlay Top");
      public static readonly left = Symbol("Application Inner Overlay Left");
      public static readonly bottom = Symbol("Application Inner Overlay Bottom");
      public static readonly right = Symbol("Application Inner Overlay Right");
      public static readonly center = Symbol("Application Inner Overlay Center");
    };
    public static readonly top = Symbol("Application Top");
    public static readonly left = Symbol("Application Left");
    public static readonly bottom = Symbol("Application Bottom");
    public static readonly right = Symbol("Application Right");
    public static readonly center = Symbol("Application Center");
  };
  public static readonly content = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Content Overlay Top");
      public static readonly left = Symbol("Content Overlay Left");
      public static readonly bottom = Symbol("Content Overlay Bottom");
      public static readonly right = Symbol("Content Overlay Right");
      public static readonly center = Symbol("Content Overlay Center");
    };
    public static readonly innerOverlay = class {
      public static readonly top = Symbol("Content Inner Overlay Top");
      public static readonly left = Symbol("Content Inner Overlay Left");
      public static readonly bottom = Symbol("Content Inner Overlay Bottom");
      public static readonly right = Symbol("Content Inner Overlay Right");
      public static readonly center = Symbol("Content Inner Overlay Center");
    };
    public static readonly top = Symbol("Content Top");
    public static readonly left = Symbol("Content Left");
    public static readonly bottom = Symbol("Content Bottom");
    public static readonly right = Symbol("Content Right");
    public static readonly center = Symbol("Content Center");
  };


  public static readonly scroll = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Scroll Overlay Top");
      public static readonly left = Symbol("Scroll Overlay Left");
      public static readonly bottom = Symbol("Scroll Overlay Bottom");
      public static readonly right = Symbol("Scroll Overlay Right");
      public static readonly center = Symbol("Scroll Overlay Center");
    };
    public static readonly innerOverlay = class {
      public static readonly top = Symbol("Scroll Inner Overlay Top");
      public static readonly left = Symbol("Scroll Inner Overlay Left");
      public static readonly bottom = Symbol("Scroll Inner Overlay Bottom");
      public static readonly right = Symbol("Scroll Inner Overlay Right");
      public static readonly center = Symbol("Scroll Inner Overlay Center");
    };
    public static readonly top = Symbol("Scroll Top");
    public static readonly left = Symbol("Scroll Left");
    public static readonly bottom = Symbol("Scroll Bottom");
    public static readonly right = Symbol("Scroll Right");
    public static readonly center = Symbol("Scroll Center");
  };
}
