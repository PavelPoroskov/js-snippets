const makeSwitchFunction = ({
  cases,
  defaultResult, 
}) => (options) => {
  const conditionTrueIndex = cases.findIndex(({ isCondition }) => isCondition(options));

  return conditionTrueIndex > -1
    ? cases[conditionTrueIndex].calculateResult(options)
    : defaultResult;
};

const WIDTH_LIMIT = 400;
const HEIGHT_LIMIT = 300;

const getIsResizeRequired = ({ width, height, ...rest }) => { 
  const widthScaleFactor = width > WIDTH_LIMIT ? WIDTH_LIMIT / width : 1;
  const heightScaleFactor = height> HEIGHT_LIMIT ? HEIGHT_LIMIT / height : 1;

  const options = {
    ...rest,
    width,
    height,
    widthScaleFactor,
    heightScaleFactor,
    isScalingWidth: widthScaleFactor < 1,
    isScalingHeight: heightScaleFactor < 1,
  };

  return makeSwitchFunction({
    cases: [
      {
        isCondition: ({ isScalingWidth, isScalingHeight }) => isScalingWidth && isScalingHeight,
        calculateResult: ({ width, height, widthScaleFactor, heightScaleFactor }) => {
          const minScaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
    
          return {
            isResizeRequired: true,
            newWidth: Math.round(width * minScaleFactor),
            newHeight: Math.round(height * minScaleFactor),
          };
        },
      },
      {
        isCondition: ({ isScalingWidth }) => isScalingWidth,
        calculateResult: ({ height, widthScaleFactor }) => ({
          isResizeRequired: true,
          newWidth: WIDTH_LIMIT,
          newHeight: Math.round(height * widthScaleFactor),
        }),
      },
      {
        isCondition: ({ isScalingHeight }) => isScalingHeight,
        calculateResult: ({ width, heightScaleFactor }) => ({
          isResizeRequired: true,
          newWidth: Math.round(width * heightScaleFactor),
          newHeight: HEIGHT_LIMIT,
        }),
      },
    ],
    defaultResult: {
      isResizeRequired: false,
    }
  })(options);
};

