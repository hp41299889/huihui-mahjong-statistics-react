import React from "react";
import { List } from "antd";

interface IProps {
    recordsListDatas: JSX.Element[];
};

const RecordList: React.FC<IProps> = (props: IProps) => {
    const { recordsListDatas } = props;

    return (
        <>
            <List
                size='small'
                dataSource={recordsListDatas}
                bordered
                renderItem={(item, index) => item}
            />
        </>
    );
};

export default RecordList;