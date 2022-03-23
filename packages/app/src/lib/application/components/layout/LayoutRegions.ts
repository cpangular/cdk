export class LayoutRegions {
  public static readonly viewport = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Viewport Overlay Top");
      public static readonly left = Symbol("Viewport Overlay Left");
      public static readonly bottom = Symbol("Viewport Overlay Bottom");
      public static readonly right = Symbol("Viewport Overlay Right");
      public static readonly center = Symbol("Viewport Overlay Center");
    };
    public static readonly base = class {
      public static readonly top = Symbol("Viewport Top");
      public static readonly left = Symbol("Viewport Left");
      public static readonly bottom = Symbol("Viewport Bottom");
      public static readonly right = Symbol("Viewport Right");
      public static readonly center = Symbol("Viewport Center");
    };
  };
  public static readonly application = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Application Overlay Top");
      public static readonly left = Symbol("Application Overlay Left");
      public static readonly bottom = Symbol("Application Overlay Bottom");
      public static readonly right = Symbol("Application Overlay Right");
      public static readonly center = Symbol("Application Overlay Center");
    };
    public static readonly base = class {
      public static readonly top = Symbol("Application Top");
      public static readonly left = Symbol("Application Left");
      public static readonly bottom = Symbol("Application Bottom");
      public static readonly right = Symbol("Application Right");
      public static readonly center = Symbol("Application Center");
    };
  };
  public static readonly scroll = class {
    public static readonly overlay = class {
      public static readonly top = Symbol("Scroll Overlay Top");
      public static readonly left = Symbol("Scroll Overlay Left");
      public static readonly bottom = Symbol("Scroll Overlay Bottom");
      public static readonly right = Symbol("Scroll Overlay Right");
      public static readonly center = Symbol("Scroll Overlay Center");
    };
    public static readonly base = class {
      public static readonly top = Symbol("Scroll Top");
      public static readonly left = Symbol("Scroll Left");
      public static readonly bottom = Symbol("Scroll Bottom");
      public static readonly right = Symbol("Scroll Right");
      public static readonly center = Symbol("Scroll Center");
    };
  };
}
