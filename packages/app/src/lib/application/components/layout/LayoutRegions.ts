export class LayoutRegions {
  public static readonly overlay = class overlay {
    public static readonly top = Symbol("Overlay Top");
    public static readonly left = Symbol("Overlay Left");
    public static readonly bottom = Symbol("Overlay Bottom");
    public static readonly right = Symbol("Overlay Right");
    public static readonly center = Symbol("Overlay Center");
  };
  public static readonly fixed = class overlay {
    public static readonly top = Symbol("Fixed Top");
    public static readonly left = Symbol("Fixed Left");
    public static readonly bottom = Symbol("Fixed Bottom");
    public static readonly right = Symbol("Fixed Right");
    public static readonly center = Symbol("Fixed Center");
  };
  public static readonly fixedOverlay = class overlay {
    public static readonly top = Symbol("Fixed Overlay Top");
    public static readonly left = Symbol("Fixed Overlay Left");
    public static readonly bottom = Symbol("Fixed Overlay Bottom");
    public static readonly right = Symbol("Fixed Overlay Right");
    public static readonly center = Symbol("Fixed Overlay Center");
  };
  public static readonly scroll = class overlay {
    public static readonly top = Symbol("Scroll Top");
    public static readonly left = Symbol("Scroll Left");
    public static readonly bottom = Symbol("Scroll Bottom");
    public static readonly right = Symbol("Scroll Right");
    public static readonly center = Symbol("Scroll Center");
  };
}
