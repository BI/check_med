import React from 'react';
import LabelSearch from './components/labelSearch.js';
import DrugSummary from './components/drugSummaryCard.js';
import DrugDetails from './components/drugDetailsOverlay.js';
import DrugRecall from './components/drugRecallAlert.js';
import About from './components/aboutOverlay.js';
import classes from 'classnames';

require('../stylesheets/app.scss');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {cards: [], overlay: null, justLanded: true};
	}

	onSelect(item) {
		var cards = this.state.cards;
		cards.unshift(item);

		this.setState({cards: cards});
	}

	onRemoveCard(id) {
		var cards = this.state.cards;
		cards.splice(id, 1);

		this.setState({cards: cards});
	}

	onCloseOverlay() {
		this.setState({overlay: null});
	}

	onChange() {
		this.setState({justLanded: false});
	}

	onOpenDetails(drugLabel, targetPage) {
		var drugDetails = (<DrugDetails drugLabel={drugLabel} targetPage={targetPage} onClose={this.onCloseOverlay.bind(this)}/>);
		this.setState({overlay: drugDetails});
	}

	onOpenRecall(drugLabel, drugRecall) {
		var drugRecall = (<DrugRecall drugLabel={drugLabel} drugRecall={drugRecall} onClose={this.onCloseOverlay.bind(this)}/>);
		this.setState({overlay: drugRecall});
	}

	onOpenAbout() {
		var about = (<About onClose={this.onCloseOverlay.bind(this)}/>);
		this.setState({overlay: about});
	}

	render() {
		var cards = this.state.cards.map(function(card, id) {
			var onRemove = this.onRemoveCard.bind(this, id);

			//key should probably actually be some identifier in the "card" object
			return (<DrugSummary key={card.openfda.spl_id || id} drugLabel={card} onClose={onRemove} onOpenDetails={this.onOpenDetails.bind(this)} onOpenRecall={this.onOpenRecall.bind(this)}/>);
		}, this);

		var disclaimer = null;

		if(this.state.justLanded) {
			disclaimer = (
				<div className="row small-12">
					<div className="column column-justLanded">
						<p className="disclaimer">This site is exclusively for the use of GSA RFQ 4QTFHS150004 and is not intended for public use. It is best viewed on the latest version of <u><a id="a_chrome" href="https://www.google.com/chrome/" target="_blank">Chrome</a></u>.
						 </p>
					</div>
				</div>
			);
		}

		//Show the overlay. If there is no overlay, show the regular search + cards instead.
		var content = this.state.overlay || (
			<div>
				<LabelSearch key="labelSearch" onSelect={this.onSelect.bind(this)} onChange={this.onChange.bind(this)}/>
				{disclaimer}
				{cards}
			</div>
		)

		var classNames = classes("app", {justLanded: this.state.justLanded});

		return (
			<div className={classNames}>
				<div className="row title-row">
					<div className="column column-justLanded">
						<h1 className="title"><i className="fa fa-plus"></i>CheckMed</h1>
						<p className="call-to-action">Drug information for expecting and nursing mothers</p>
					</div>
				</div>
				{content}
				<div className="footer"><div className="row">
					<div className="column small-8">
						<button onClick={this.onOpenAbout.bind(this)}>Learn more <u>about</u> <span className="logo-font">CheckMed</span>&nbsp;</button>
					</div>
					<div className="column small-4 right-align">
               <button>
                    <u>
                         <a id="a_contact" href="mailto:info@barquin.com" target="_top">Contact</a>
                    </u>
               </button>
          </div></div>
				</div>
			</div>
		);
	}
};
