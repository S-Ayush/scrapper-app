import * as cheerio from "cheerio";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { SiteInfoContext } from "../../context/SiteContext";
import { arrayBufferToString, validateUrl } from "../../helpers/heplers.utils";
import RouteDefinitions from "../../router/RouteDefinition";
import {
  getScrappingData,
  safeBrowsingApi,
} from "../../services/scrappingServices";
import styles from "./ScrappingForm.module.scss";

const ScrappingForm = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setSiteInfo } = useContext(SiteInfoContext);
  const toaterId = useRef();
  const navigate = useNavigate();

  const handelInputChange = (e) => {
    setInputUrl(e.target.value);
    setError(null);
  };

  const scrappingData = () => {
    // get scrapped data from url
    getScrappingData(inputUrl)
      .then((res) => {
        setIsLoading(false);
        toast.update(toaterId.current, {
          render: "Site fetched Successfully!",
          type: toast.TYPE.SUCCESS,
          isLoading: false,
        });

        // load cheerio data from scrapped data
        const $ = cheerio.load(arrayBufferToString(res.data));
        const title = $("title").text();
        const description = $("meta[name=description]")?.attr()?.content;
        const author = $("meta[name=author]")?.attr()?.content;
        debugger;
        let image = $("link[rel=icon]")?.attr()?.href;
        image = image ?? $("meta[name=image]")?.attr()?.content;
        const url = $("link[rel=canonical]")?.attr()?.href;
        const locale = $("html")?.attr()?.lang;
        const published_date = $("meta[property=article:published_time]").attr()
          ?.content;

        // set all the data in siteInfo context
        setSiteInfo({
          site: inputUrl,
          title,
          description,
          author,
          image,
          url,
          locale,
          published_date,
        });

        // navigate to Details page
        navigate(RouteDefinitions.ROUTE_SITE_DETAILS);
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Currently unreachable!");
        toast.update(toaterId.current, {
          render: "something went wrong! Try Again!",
          type: "error",
          isLoading: false,
        });
      });
  };

  const fetchData = () => {
    // validate the url is correct or not and then throw error if not valid
    if (!validateUrl(inputUrl)) {
      setError("Enter A Valid Url!");
      return false;
    } else {
      toast.done(toaterId.current);
      toaterId.current = toast.loading("Fetching Site Info");
      setIsLoading(true);

      // check url is safe or Malicious
      safeBrowsingApi(inputUrl).then((res) => {
        if (res.data.matches) {
          setIsLoading(false);
          setError("Malicious URL. Try with different url!");
          toast.update(toaterId.current, {
            render: "Malicious URL. Try with different url!",
            type: "error",
            isLoading: false,
          });
        } else {
          scrappingData();
        }
      });
    }
  };

  // these useEffects are only for removing toaster after some time
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        toast.dismiss(toaterId.current);
      }, 2000);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        toast.dismiss(toaterId.current);
      }, 2000);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2>Enter Your Site For Scrapping</h2>
        <div className={styles.inputSection}>
          <input
            className={error && styles.error}
            type="text"
            onChange={handelInputChange}
            value={inputUrl}
            placeholder="Enter Your Site URL"
          />

          {/* If error then error text will be shown */}
          {error && <div className={styles.errorText}>{error}</div>}
        </div>
        <div className={styles.loadingButton}>
          <button
            disabled={isLoading}
            className={isLoading ? styles.disabled : ""}
            onClick={() => fetchData()}
          >
            Fetch Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrappingForm;
