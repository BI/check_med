import React from 'react';

export default class RecallAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var drugLabel = this.props.drugLabel;
    var drugRecall = this.props.drugRecall;
    
    var brandName = drugRecall.openfda.brand_name;
    var genericName = drugRecall.openfda.generic_name;
    var manufacturer = drugRecall.openfda.manufacturer_name;

    var recallClass = drugRecall.classification;
    var info = drugRecall.product_description;
    var reason = drugRecall.reason_for_recall;
    var status = drugRecall.status;
    var quantity = drugRecall.product_quantity;
    var distribution = drugRecall.distribution_pattern;
    var issued = drugRecall.report_date;
    var contact = drugLabel.contact;
    var lot_number = drugRecall.code_info;

    if(issued) {
      issued = issued.substr(4,2) + "/" + issued.substr(6,2) + "/" + issued.substr(0,4);
    }

    var packageNdc = [];
    var productNdc = [];

    var packageNdcs = drugRecall.openfda.package_ndc;
    var productNdcs = drugRecall.openfda.product_ndc;

    if(packageNdcs && packageNdcs.length) {
      packageNdc = packageNdcs.map(function(ndc) {
        return (<li><i className="fa-li fa fa-angle-double-right"></i>{ndc}</li>);
      });
    }

    if(productNdcs && productNdcs.length) {
      productNdc = productNdcs.map(function(ndc) {
        return (<li><i className="fa-li fa fa-angle-double-right"></i>{ndc}</li>);
      });
    }

    return (
      <div className="layout-overlay recall-details">
        <button className="back-navigation" onClick={this.props.onClose.bind(this)}><i className="fa fa-chevron-left"></i><span className="aria-text">Back</span></button>
        <div className="layout-table">
          <div className="fixed-header">
            <h2 className="recall-title">
              <span className="recall-title-text">Recall Alert</span> <i className="fa fa-exclamation-circle"></i>
            </h2>
            <div className="row label-recall">
              <div className="column small-12">
                <span className="label-recall-text">The item you selected is under a <span className="label-recall-badge">{recallClass} <i className="fa fa-info-circle" data-tooltip aria-haspopup="true" title="
Class I recall: a situation in which there is a reasonable probability that the use of or exposure to a violative product will cause serious adverse health consequences or death.&#013;
Class II recall: a situation in which use of or exposure to a violative product may cause temporary or medically reversible adverse health consequences or where the probability of serious adverse health consequences is remote.&#013;
Class III recall: a situation in which use of or exposure to a violative product is not likely to cause adverse health consequences.
"></i></span> recall</span>
              </div>
            </div>
          </div>
          <div className="overflow-y">
            <div className="row label-overview">
              <div className="column small-12">
                <h2 className="label-heading">
                  <div className="label-title">
                    <span className="label-brandName">{brandName}</span> <span className="label-genericName">({genericName})</span>
                  </div>
                  <div className="label-manufacturer">{manufacturer}</div>
                </h2>
                <p className="recall-description">{info}</p>
              </div>
            </div>
            <div className="row">
              <div className="column small-12 reason-for-recall">
                <h3 className="label-field">Reason for Recall</h3>
                <p>{reason}</p>
              </div>
            </div>
            <div className="row">
              <div className="columns medium-6 large-3">
                <h3 className="label-field">Status</h3>
                <p>{status}</p>
              </div>
              <div className="columns medium-6 large-3">
                <h3 className="label-field">Distribution</h3>
                <p>{distribution}</p>
              </div>
              <div className="columns medium-6 large-3">
                <h3 className="label-field">Quantity</h3>
                <p>{quantity}</p>
              </div>
              <div className="columns medium-6 large-3">
                <h3 className="label-field">Issued</h3>
                <p>{issued}</p>
              </div>
            </div>

            <div className="row">
              <div className="columns large-12">
                <h3 className="label-field">Lot Number(s) <i className="fa fa-info-circle" title="A list of all lot and/or serial numbers, product numbers, packer or manufacturer numbers, sell or use by dates, etc., which appear on the product or its labeling."></i></h3>
                <p>{lot_number}</p>
              </div>
            </div>

            <div className="row">
              <div className="columns medium-6">
                <h3 className="label-field">Package NDC <i className="fa fa-info-circle" title="Each listed drug product is assigned a unique 10-digit, 3-segment number. This number, known as the NDC, identifies the labeler, product, and trade package size. The first segment, the labeler code, is assigned by the FDA."></i></h3>
                <ul className="fa-ul small-block-grid-2 medium-block-grid-3 large-block-grid-4">
                  {packageNdc}
                </ul>
              </div>

              <div className="columns medium-6">
                <h3 className="label-field">Product NDC <i className="fa fa-info-circle" title="Each listed drug product is assigned a unique 10-digit, 3-segment number. This number, known as the NDC, identifies the labeler, product, and trade package size. The first segment, the labeler code, is assigned by the FDA."></i></h3>
                <ul className="fa-ul small-block-grid-2 medium-block-grid-3 large-block-grid-4">{productNdc}</ul>
                <p className="recall-contact">{contact}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

RecallAlert.propTypes = {
  onClose: React.PropTypes.func,
  drugLabel: React.PropTypes.object,
  drugRecall: React.PropTypes.object,
}
