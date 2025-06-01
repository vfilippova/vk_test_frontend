import React, {
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";
import axios from "axios";
import { ScrollWrapper } from "./ScrollWrapper";

const API_URL = "http://localhost:3001/data";

export type TableHandle = {
    reload: () => void;
};

export const TableWithRef = forwardRef<TableHandle>((_, ref) => {
    const [data, setData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const loadPage = async (pageNum: number) => {
        const res = await axios.get(`${API_URL}?_page=${pageNum}&_limit=10`);
        const newData = res.data;
        if (pageNum === 1) {
            setData(newData);
        } else {
            setData((prev) => [...prev, ...newData]);
        }
        if (newData.length < 10) setHasMore(false);
        setPage(pageNum + 1);
    };

    const fetchData = useCallback(() => {
        return loadPage(page);
    }, [page]);

    const reload = () => {
        setPage(1);
        setHasMore(true);
        loadPage(1); // загружаем первую страницу и сбрасываем старые данные
    };

    useImperativeHandle(ref, () => ({ reload }));

    useEffect(() => {
        loadPage(1);
    }, []);

    return (
        <ScrollWrapper dataLength={data.length} next={fetchData} hasMore={hasMore}>
            <div>
                <table className="table-auto w-full border">
                    <thead>
                    <tr>
                        {data[0] &&
                            Object.keys(data[0]).map((key) => (
                                <th key={key} className="border px-4 py-2">
                                    {key}
                                </th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx}>
                            {Object.values(item).map((val, i) => (
                                <td key={i} className="border px-4 py-2">
                                    {String(val)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </ScrollWrapper>
    );
});
