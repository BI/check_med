import React from 'react';
import InfoOverlay from './infoOverlay.js';
import classes from 'classnames';

export default class AboutOverlay extends InfoOverlay {
  constructor(props) {
    super(props);
  }

  renderContent() {
    return (
      <div  className="layout-table">
        <div className="fixed-header">
          <h2 className="label-heading">
            <div className="label-title">
              <span className="label-brandName">About</span> <span className="label-genericName"></span>
            </div>
            <div className="label-manufacturer"></div>
          </h2>
          <div className="row label-details-overview">
            <div className="column small-12">
              <p><span className="label-badge">&nbsp;</span></p>
              
            </div>
          </div>
        </div>
        <div className="overflow-y">
          <div className="row">
            <div className="column small-12">
              <p>This site was developed in response to GSA Request for Quotation (RFQ) 4QTFHS150004 by Barquin International. To learn more about Barquin International, please visit our website: http://www.barquin.com/.</p>
              <p>Development of the site tests an organization’s ability to apply agile development techniques over a short period of time using open source technology on open data provided exclusively for this RFQ. The source of the data is the Food and Drug Administration (FDA) collections related to enforcements, adverse events and labeling of drugs, food and medical devices. Developers were asked to design and deploy an application that serves a purpose and is useful to specific communities of interested people  (e.g., patients, researchers, manufacturers).</p>
              <p>CheckMed has focused on assisting pregnant women and nursing mothers who are taking or considering taking, certain drugs, by highlighting important information on the drugs. Examples of this follow:</p>
              <p>“I am taking, or am thinking of taking, X, Y and Z drugs.”</p>
              <ol>
              <li>Are there any issues I should be aware of related to X, Y and Z?
              <ul><li>Provides direct information about the drug as well as general and pregnancy warnings as it appears in the labelling information provided by the manufacturer to the FDA.</li></ul></li>
              <li>Are there reported adverse reactions for any of them?
              <ul><li>For each drug, you can see how many serious and not serious adverse events have been reported.</li></ul></li>
              <li>What are the correct dosages for each?
              <ul><li>Dosage information is provided from the labeling information provided by the manufacturer to the FDA.</li></ul></li>
              <li>Have any of them been recalled recently?
              <ul><li>If a drug has been recalled, “Recall Reports” are provided directly.</li></ul></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      );
  }
};