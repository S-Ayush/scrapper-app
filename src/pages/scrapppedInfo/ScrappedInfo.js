import React, { useContext, useEffect } from "react";
import { SiteInfoContext } from "../../context/SiteContext";
import styles from "./ScrappedInfo.module.scss";

const ScrappedInfo = () => {
  const { siteInfo } = useContext(SiteInfoContext);

  return (
    <div className={styles.container}>
      <h2>Site Info For </h2>
      <h3>{siteInfo.site}</h3>
      <div className={styles.tableSection}>
        <table>
          <tbody>
            <tr>
              <td>Title</td>
              <td>{siteInfo.title}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{siteInfo.description}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{siteInfo.author}</td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <img className={styles.thumbnail} src={siteInfo.image} />
              </td>
            </tr>
            <tr>
              <td>URL</td>
              <td>{siteInfo.url}</td>
            </tr>
            <tr>
              <td>Locale</td>
              <td>{siteInfo.locale}</td>
            </tr>
            <tr>
              <td>Published date</td>
              <td>{siteInfo.published_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrappedInfo;
