import React from "react";
import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LensBlurIcon from '@mui/icons-material/LensBlur';
import "./WidgetBasis.css";
import { WidgetMap, WidgetOptions } from "../../data/SectionObject";
const listItems: {
  ListItemName: string;
  Tags: [{ TagName: string; TagColor: string }];
}[] = require("../../data/ListItems.json");

type Props = { header: string; deleteListItem: (header: string) => void };

const WidgetBasis: React.FC<Props> = ({ header, deleteListItem }) => {
  let listItem = listItems.find((item: any) => item.ListItemName === header);
  let tags = listItem?.Tags;
  let Widget: WidgetOptions | undefined = WidgetMap.get(header);
  const [uniquePress, setUniquePress] = useState<boolean>(false);

  return (
    <div className="widgetStyles">
      <div className="widgetHeader">
        <h2>{header}</h2>
        <section>
            {Widget?.UniqueButton ? (
            <IconButton
                onClick={() => setUniquePress(true)}
                style={{ color: "white" }}
            >
                <LensBlurIcon />
            </IconButton>
            ) : (
            <></>
            )}
            <IconButton
            onClick={() => deleteListItem(header)}
            style={{ color: "white" }}
            >
                <DeleteIcon />
            </IconButton>
        </section>
      </div>
      <div className="widgetTagContainer">
        {tags?.map((tag, index) => (
          <p
            key={index}
            className="widgetBasisTags"
            style={{ backgroundColor: `var(--tag-${tag.TagColor})` }}
          >
            {tag.TagName}
          </p>
        ))}
      </div>
      {Widget?.Widget ? (
        <Widget.Widget
          buttonPress={uniquePress}
        />
      ) : null}
    </div>
  );
};

export default WidgetBasis;
