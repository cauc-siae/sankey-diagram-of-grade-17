import data from "./cleaned_data.json";
import * as echarts from "echarts";

const baseOption = {
  title: {
    text: "中欧学院2017级人数变化图",
    subtext: "数据更新于：2024.07.02",
    left: "center",
  },
  textStyle: {
    fontSize: 16,
  },
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
    formatter: "{b0}: {c0}人",
  },
  toolbox: {
    show: true,
    orient: "horizontal",
    itemSize: 20,
    itemGap: 20,
    right: "10%",
    top: "top",
    feature: {
      saveAsImage: {show: true, title: "保存图片", pixelRatio: 2},
    },
  },
  series: [
    {
      type: "sankey",
      data: data.nodes,
      links: data.links,
      left: 20,
      top: 5,
      right: 240,
      bottom: 20,
      nodeAlign: "left",
      label: {
        position: "right",
        offset: [-15, 0],
        fontSize: 12,
        fontWeight: "bold",
        width: 500,
        rotate: 15,
        overflow: "break",
        formatter: "{b0}({c0}人)",
      },
      emphasis: {
        focus: "trajectory",
      },
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      draggable: false, // Disable node dragging
    },
  ],
};

const svgIcon: string = `path://M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z`;
const pngIcon: string = `path://M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z`;


function useEchartsOption(useSvg: boolean, handler: () => void) {
  const toPngButtonOption = {
    show: true,
    title: "切换为像素点图",
    icon: svgIcon,
    onclick: handler,
  };

  const toSvgButtonOption = {
    show: true,
    title: "切换为矢量图",
    icon: pngIcon,
    onclick: handler,
  };

  let option = JSON.parse(JSON.stringify(baseOption));
  option.toolbox.feature.myImageFormatSwitch = useSvg ? toPngButtonOption : toSvgButtonOption;

  const prefixTitle = useSvg ? "矢量图" : "像素点图";
  option.toolbox.feature.saveAsImage.title = `保存为${prefixTitle}`;

  return {
    option,
  };
}

export default function useEcharts(container: HTMLDivElement, useSvg: boolean, handler: () => void) {
  const {option} = useEchartsOption(useSvg, handler);

  let myChart = echarts.init(container, null, {renderer: useSvg ? "svg" : "canvas"});
  myChart.hideLoading();
  myChart.setOption(option);
}
