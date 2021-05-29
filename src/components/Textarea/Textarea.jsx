/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-else-return */
import * as React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Box from "@material-ui/core/Box";

const placeholderColor = "#777777";

export default function Textarea(props) {
  // textarea on some browsers (Safari) do not respects newlines

  // MutationObserver has better support
  // but for some reason, textarea style change
  // doesn't fire the callback on Safari

  if (
    props.placeholder == null ||
    props.placeholder === "" ||
    (window.MutationObserver == null && window.ResizeObserver == null)
  ) {
    return <TextareaAutosize {...props} />;
  }
  return <CrossPlatformTextarea {...props} />;
}

function CrossPlatformTextarea({ register, placeholder, ...rest }) {
  const textAreaReference = React.useRef();
  const [showPlaceholder, setShowPlaceholder] = React.useState(null);
  const [areaSize, setAreaSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const textArea = textAreaReference.current;
    window.textArea = textArea;

    function onFocus() {
      setShowPlaceholder(false);
    }
    function onBlur() {
      if (
        (textArea.value === "" || textArea.value == null) &&
        (rest.value === "" || rest.value == null)
      ) {
        setShowPlaceholder(true);
      } else {
        setShowPlaceholder(false);
      }
    }

    if (document.activeElement !== textArea) {
      onBlur();
    }

    textArea.addEventListener("focus", onFocus);
    textArea.addEventListener("blur", onBlur);

    return () => {
      textArea.removeEventListener("focus", onFocus);
      textArea.removeEventListener("blur", onBlur);
    };
  }, [rest.value, rest.defaultValue]);

  React.useEffect(() => {
    if (rest.defaultValue) {
      setShowPlaceholder(false);
    }
  }, [rest.defaultValue]);

  React.useEffect(() => {
    let frameId = null;
    const textArea = textAreaReference.current;
    setAreaSize({
      width: textArea.offsetWidth,
      height: textArea.offsetHeight
    });

    function onResize() {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setAreaSize({
          width: textArea.offsetWidth,
          height: textArea.offsetHeight
        });
      });
    }

    let observer;

    if (window.ResizeObserver) {
      console.log("creating observer");
      observer = new ResizeObserver(onResize);
      observer.observe(textArea);
    } else {
      observer = new MutationObserver(onResize);
      observer.observe(textArea, {
        attributes: true,
        childList: false,
        subtree: false
      });
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  const textArea = textAreaReference.current;

  const parsedPlaceholder = React.useMemo(() => {
    return placeholder
      .split("\n")
      .map((paragraph, index) =>
        paragraph === "" ? (
          <br key={index} />
        ) : (
          <div key={index}>{paragraph}</div>
        )
      );
  }, [placeholder]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextareaAutosize
        ref={(current) => {
          textAreaReference.current = current;
          if (typeof register === "function") register(current);
          if (register == null) return;
          register.current = register;
        }}
        {...rest}
        style={{
          fontSize: "13.333px",
          background: "transparent",
          position: "absolute",
          top: "0",
          left: "0",
          ...rest.style
        }}
      />
      <Box
        sx={{
          overflow: "hidden",
          font: textArea ? textArea.font : undefined,
          fontSize: "13.333px",
          background: "white",
          color: placeholderColor,
          width: areaSize.width,
          height: areaSize.height,
          display: "block",
          padding: textArea ? textArea.style.padding : undefined
        }}
      >
        {showPlaceholder ? parsedPlaceholder : ""}
      </Box>
    </Box>
  );
}
