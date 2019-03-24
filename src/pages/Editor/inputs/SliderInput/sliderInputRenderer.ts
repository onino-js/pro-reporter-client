import * as d3 from "d3";
import { ISliderInputProps } from "./SliderInput";

export const sliderInputRenderer = (
  container: any,
  {
    min,
    max,
    value,
    onChange,
    width,
    height,
    barHeight,
    barColor,
    barBorderRadius,
    markerColor,
    overlapColor,
    markerWidth,
    markerHeight,
    labelSuffix,
    labelYOffset,
    labelFontSize,
    step,
  }: ISliderInputProps,
) => {
  const svg_firstRender = d3
    .select(container)
    .selectAll("svg")
    .data(["svg"])
    .enter()
    .append("svg");

  // SET SIZE
  const svg = d3.select(container).select("svg");
  // @ts-ignore
  width = width || container.getBoundingClientRect().width;
  // @ts-ignore
  height = height || container.getBoundingClientRect().height;

  const markerOffset = (markerHeight! - barHeight!) / 2;

  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", "100%")
    .attr("height", "100%")
    .style("overflow", "visible")
    .style("cursor", "pointer");

  const scale = d3
    .scaleLinear()
    .domain([0, width!])
    .range([min, max]);

  const unscale = d3
    .scaleLinear()
    .domain([min, max])
    .range([0, width!]);

  // main bar
  svg_firstRender
    .append("rect")
    .attr("class", "main-bar")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", barHeight!);

  // overlap bar
  svg_firstRender
    .append("rect")
    .attr("class", "overlap-bar")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", barHeight!);

  // default marker
  // svg_firstRender.append("circle").attr("class", "marker");
  svg_firstRender
    .append("g")
    .attr("class", "marker-group")
    .append("polyline")
    .attr("class", "marker");

  svg_firstRender
    .select(".marker-group")
    .append("circle")
    .attr("r", 10)
    .attr("fill", markerColor!)
    .attr("cy", 25)
    .attr("cx", markerWidth! / 2);

  // svg_firstRender
  //   .append("text")
  //   .attr("class", "label-text")
  //   .attr("fill", markerColor!)
  //   .attr("font-size", labelFontSize!)
  //   .attr("font-family", "sans serif")
  //   .attr("font-weight", "bolder")
  //   .style("text-anchor", "middle")
  //   .style("alignment-baseline", "middle");

  // UPDATE
  // main-bar
  d3.select(container)
    .select(".main-bar")
    .attr("fill", barColor!)
    .attr("rx", barBorderRadius!)
    .attr("ry", barBorderRadius!)
    .attr("height", barHeight!);

  // overlap-bar
  const overlapBar = d3
    .select(container)
    .select(".overlap-bar")
    .attr("fill", overlapColor!)
    .attr("rx", barBorderRadius!)
    .attr("ry", barBorderRadius!)
    .attr("height", barHeight!)
    .attr("width", Math.min(unscale(value), width!));

  // marker
  const marker = d3
    .select(container)
    .select(".marker")
    .attr("fill", markerColor!)
    // .attr("x", unscale(value))
    .attr("points", getPolyPoints(markerHeight!, markerWidth!));

  const markerGroup = d3
    .select(container)
    .select(".marker-group")
    .attr(
      "transform",
      `translate(${Math.min(unscale(value), width!) -
        markerWidth! / 2}, ${-markerOffset})`,
    );

  // const text = d3
  //   .select(container)
  //   .select(".label-text")
  //   ///.text(Math.round(value) + labelSuffix!)
  //   .text(Math.round(value * step!) / step! + " " + labelSuffix!)
  //   .attr("x", Math.min(unscale(value), width!))
  //   .attr("transform", `translate(0, ${-labelYOffset!})`);

  // EVENTS
  const getPosition = (el: any) => {
    const x = d3.mouse(el)[0];
    const _x = Math.max(x, 0);
    return Math.min(_x, width!);
  };

  const updatePosition = (x: number) => {
    markerGroup.attr(
      "transform",
      `translate(${x - markerWidth! / 2} ${-markerOffset})`,
    );
    // text.attr("x", x);
    // text.text(Math.round(scale(x) * step!) / step! + " " + labelSuffix!);
    overlapBar.attr("width", x);
  };

  const dragged = function() {
    // @ts-ignore
    updatePosition(getPosition(this));
    // @ts-ignore
    // onChange(Math.round(scale(getPosition(this)) * step!) / step!);
  };

  const draggedEnd = function() {
    // @ts-ignore
    const x = getPosition(this);
    // onChange(Math.round(scale(x)));
    onChange(Math.round(scale(x) * step!) / step!);
  };

  const dragHandler = d3
    .drag()
    .on("start", dragged)
    .on("drag", dragged)
    .on("end", draggedEnd);

  //@ts-ignore
  dragHandler(svg);

  d3.select(container)
    .select("svg")
    .on("click", function() {
      // updatePosition(getPosition(this));
      // onChange(Math.round(scale(getPosition(this))));
      onChange(Math.round(scale(getPosition(this)) * step!) / step!);
    });
};

const getPolyPoints = (h: number, w: number) => {
  return [w / 2, 0, w, w / 2, w, h, 0, h, 0, w / 2].join(",");
};
