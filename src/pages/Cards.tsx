/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface IArray {
  [x: string]: any;
  image?: string;
  index?: number;
}
function Cards(fullArray: IArray) {
  return (
    <div className="full_cards">
      {fullArray.map(
        (
          item: {
            image: string | undefined;
            index:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          },
          index: number
        ) => (
          <div key={index}>
            <div>
              <img width="130px" src={item.image} />
            </div>
            <div>{item.index}</div>
          </div>
        )
      )}
    </div>
  );
}
export { Cards };
