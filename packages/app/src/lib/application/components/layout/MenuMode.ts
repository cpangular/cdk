export enum MenuToggle {
  NO_TOGGLE,
  TOGGLE,
}

export enum MenuRelativeLocation {
  SCROLL = 2,
  UNDER = 4,
  OVER = 8,
  VIEWPORT = 16,
}
export enum MenuLayoutBehavior {
  INLINE = 32,
  OVER = 64,
}

// menu position is relative to header
export enum MenuMode {
  scrollNoToggle = MenuRelativeLocation.SCROLL | MenuLayoutBehavior.INLINE | MenuToggle.NO_TOGGLE,
  scrollToggle = MenuRelativeLocation.SCROLL | MenuLayoutBehavior.INLINE | MenuToggle.TOGGLE,

  underHeaderInlineNoToggle = MenuRelativeLocation.UNDER | MenuLayoutBehavior.INLINE | MenuToggle.NO_TOGGLE,
  underHeaderInlineToggle = MenuRelativeLocation.UNDER | MenuLayoutBehavior.INLINE | MenuToggle.TOGGLE,
  underHeaderOverContentToggle = MenuRelativeLocation.UNDER | MenuLayoutBehavior.OVER | MenuToggle.TOGGLE,

  overHeaderInlineNoToggle = MenuRelativeLocation.OVER | MenuLayoutBehavior.INLINE | MenuToggle.NO_TOGGLE,
  overHeaderInlineToggle = MenuRelativeLocation.OVER | MenuLayoutBehavior.INLINE | MenuToggle.TOGGLE,
  overHeaderToggle = MenuRelativeLocation.OVER | MenuLayoutBehavior.OVER | MenuToggle.TOGGLE,

  viewportInlineNoToggle = MenuRelativeLocation.VIEWPORT | MenuLayoutBehavior.INLINE | MenuToggle.NO_TOGGLE,
  viewportInlineToggle = MenuRelativeLocation.VIEWPORT | MenuLayoutBehavior.INLINE | MenuToggle.TOGGLE,
  viewportOverToggle = MenuRelativeLocation.VIEWPORT | MenuLayoutBehavior.OVER | MenuToggle.TOGGLE,
}
