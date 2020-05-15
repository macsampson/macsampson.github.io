import React from "react";

function DownloadResume() {
  return (
    <div className="row">
      <div className="columns download">
        <p>
          <a
            // Remember to replace www.dropbox.com with dl.dropboxusercontent.com in order to do a direct download!
            // Also run "npm run deploy" to deploy this website..
            href="https://hired.com/resumes/mac-sampson"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" />
            View PDF Resume
          </a>
        </p>
      </div>
    </div>
  );
}

export default DownloadResume;
