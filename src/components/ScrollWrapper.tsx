import React, { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type ScrollWrapperProps = {
    dataLength: number;
    next: () => void;
    hasMore: boolean;
    loader?: ReactNode;
    children: ReactNode;
};

export const ScrollWrapper = ({
                                  dataLength,
                                  next,
                                  hasMore,
                                  loader = <h4>Loading...</h4>,
                                  children,
                              }: ScrollWrapperProps) => {
    return (
        <InfiniteScroll
            dataLength={dataLength}
            next={next}
            hasMore={hasMore}
            loader={loader}
        >
            {children}
        </InfiniteScroll>
    );
};
