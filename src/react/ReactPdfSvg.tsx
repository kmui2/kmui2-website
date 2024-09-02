 
 
 
 

import React, { memo, Children } from 'react';
import type { Component, FC, PropsWithChildren, ReactElement } from 'react';
import ReactDomServer from 'react-dom/server';
import {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Text,
  Tspan,
} from '@react-pdf/renderer';

/**
 * Source: https://github.com/diegomura/react-pdf/discussions/2586#discussion-6163199
 * @param node
 * @returns
 */
export const parseSvg = (node: Node) => {
  if (node.hasChildNodes()) {
    return Array.from(node.childNodes).map<JSX.Element | null>(
      (child: ChildNode, index: number): JSX.Element | null => {
        const { nodeName, attributes } = child as Element;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let ReactPdfComponent: typeof Component<React.PropsWithChildren<any>>;
        switch (nodeName.toLowerCase()) {
          case 'svg':
            ReactPdfComponent = Svg;
            break;
          case 'line':
            ReactPdfComponent = Line;
            break;
          case 'polyline':
            ReactPdfComponent = Polyline;
            break;
          case 'polygon':
            ReactPdfComponent = Polygon;
            break;
          case 'path':
            ReactPdfComponent = Path;
            break;
          case 'rect':
            ReactPdfComponent = Rect;
            break;
          case 'circle':
            ReactPdfComponent = Circle;
            break;
          case 'ellipse':
            ReactPdfComponent = Ellipse;
            break;
          case 'text':
            ReactPdfComponent = Text;
            break;
          case 'tspan':
            ReactPdfComponent = Tspan;
            break;
          case 'g':
            ReactPdfComponent = G;
            break;
          case 'stop':
            ReactPdfComponent = Stop;
            break;
          case 'defs':
            ReactPdfComponent = Defs;
            break;
          case 'clippath':
            ReactPdfComponent = ClipPath;
            break;
          case 'lineargradient':
            ReactPdfComponent = LinearGradient;
            break;
          case 'radialgradient':
            ReactPdfComponent = RadialGradient;
            break;
          default:
            return null;
        }
        const props: Record<string, string> = {};
        for (const attr of attributes) {
          props[attr.name] = attr.value;
        }
        return (
          ReactPdfComponent && (
            <ReactPdfComponent key={`${child.nodeName}-${index}`} {...props}>
              {parseSvg(child)}
            </ReactPdfComponent>
          )
        );
      },
    );
  }
  return null;
};

export const getSvgDom = (svgString: string) => {
  return new DOMParser().parseFromString(svgString, 'image/svg+xml');
};

const ReactPdfSvg: FC<PropsWithChildren> = ({ children }) => {
  return Children.toArray(children).map((child) => {
    return parseSvg(getSvgDom(ReactDomServer.renderToString(child as ReactElement)));
  });
};

export default memo(ReactPdfSvg);
