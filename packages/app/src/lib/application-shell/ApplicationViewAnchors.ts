export class ApplicationViewAnchors{
    static readonly logo = Symbol("Application Shell Logo Anchor");
    static readonly title = Symbol("Application Shell Title Anchor");
    static readonly mainPanel = Symbol("Application Shell  Main Panel Anchor");
    static readonly secondaryPanel = Symbol("Application Shell Secondary Panel Anchor");
    static readonly headerTools = Symbol("Header Tool Area Anchor");

    static readonly toolbar = class ToolbarAnchors {
        static readonly left = Symbol("Application Shell Toolbar Left Anchor");
        static readonly center = Symbol("Application Shell Toolbar Center Anchor");
        static readonly right = Symbol("Application Shell Toolbar Right Anchor");
    }
}