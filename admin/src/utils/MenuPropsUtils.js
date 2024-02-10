const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;

export const MenuProps = ({ width }) => ({
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: width || 350,
    },
  },
});
