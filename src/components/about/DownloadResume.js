import React from "react";

function DownloadResume() {
  return (
    <div className="row">
      <div className="columns download">
        <p>
          <a
            // Remember to replace www.dropbox.com with dl.dropboxusercontent.com in order to do a direct download!
            // Also run "npm run deploy" to deploy this website..
            href="https://github.com/macsampson/macsampson.github.io/raw/source/src/data/Mac_Sampson_Resume_2021_cs_1.0.pdf"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" />
            Download PDF Resume
          </a>
        </p>
      </div>
    </div>
  );
}

export default DownloadResume;
