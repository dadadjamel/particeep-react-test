import "./filters.css";

import { Filters as FiltersType } from "../App";
import { RootState } from "../redux/store";
import { Select } from "antd";
import { useAppSelector } from "../hooks/useAppDispatch";

type Props = {
    filters: FiltersType;
    onUpdateFilters: (filters: FiltersType) => void;
};
export const Filters = ({ filters, onUpdateFilters }: Props) => {
    const movies = useAppSelector((state: RootState) => state.movies.movies);

    const categories = Array.from(
        new Set(movies.map((movie) => movie.category))
    );

    return (
        <div className="filters">
            <Select
                style={{ width: 140 }}
                value={filters.itemsPerPage}
                defaultValue={filters.itemsPerPage}
                onChange={(pagenumber) =>
                    onUpdateFilters({ ...filters, itemsPerPage: pagenumber })
                }
                options={[
                    { value: 4, label: "4" },
                    { value: 8, label: "8" },
                    { value: 12, label: "12" },
                ]}
            />

            <Select
                mode="multiple"
                allowClear
                style={{ width: "200px" }}
                placeholder="Select a category"
                onChange={(categories) =>
                    onUpdateFilters({
                        ...filters,
                        categories,
                        currentPage: 0,
                    })
                }
                options={categories.map((category) => ({
                    label: category,
                    value: category,
                }))}
            />
        </div>
    );
};
