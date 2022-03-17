export class InternalViewAnchors{

    static readonly notices = Symbol("App Notices");









    static readonly  overlay = class {
        static readonly top = Symbol("App Overlay Top");
        static readonly bottom = Symbol("App Overlay Bottom");
        static readonly left = Symbol("App Overlay Left");
        static readonly right = Symbol("App Overlay Right");
    }
    static readonly  outerPanel = class {
        static readonly top = Symbol("App Outer Panel Top");
        static readonly bottom = Symbol("App Outer Panel Bottom");
        static readonly left = Symbol("App Outer Panel Left");
        static readonly right = Symbol("App Outer Panel Right");
    }
    static readonly  innerPanel = class {
        static readonly top = Symbol("App Inner Panel Top");
        static readonly bottom = Symbol("App Inner Panel Bottom");
        static readonly left = Symbol("App Inner Panel Left");
        static readonly right = Symbol("App Inner Panel Right");
    }




    static readonly menuButtonLeft = Symbol("Left Menu Button");
    static readonly menuButtonRight = Symbol("Right Menu Button");
    static readonly headerInnerPosition = Symbol("Inner header Position");
    
}