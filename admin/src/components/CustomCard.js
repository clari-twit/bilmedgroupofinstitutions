import { Button, Card, CardContent, Typography } from '@mui/material';

function CustomCard({ title, content, color, variant, buttonText, onButtonClick, maxWidth, width, buttonVariant, buttonColor, paddingTop, paddingBottom, paddingLeft, paddingRight, height, maxHeight, overflowY }) {
  return (
    // Card
    <Card
      variant={variant}
      color={color}
      sx={{ maxWidth, width, paddingTop, paddingBottom, paddingLeft, paddingRight, height, maxHeight, overflowY }}
    >
      {/* ----Card title part---- */}
      {title && (
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      )}
      {/* ----Card content part---- */}
      {content && (
        <CardContent>
          <Typography color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      )}
      {/* ----Card bottom button part---- */}
      {buttonText && (
        <CardContent sx={{ paddingBottom: '16px' }}>
          <Button
            variant={buttonVariant}
            color={buttonColor}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default CustomCard;
