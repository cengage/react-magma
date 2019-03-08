import React from 'react';
import { IconButton } from 'react-magma-dom'
import MainNav from '../main-nav/main-nav'

export class NavPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggleButtonRef = React.createRef();
      }    

    openMenu = () => {
        // TODO: Trap focus
        // TODO: Aria-hide content below overlay
        // TODO: Aria-hide and not allow focus over nav when menu is hidden
        // TODO: Close menu on escape press

        document.getElementsByTagName('html')[0].classList.add("nav-open");
        this.setState({isOpen: true})
    }
      
    closeMenu = () => {
        // TODO: Put focus on menu button
        // TODO: Close menu after tabbing out or put focus on first element?
        // TODO: Trap focus
        // TODO: Aria-hide content below overlay
        // TODO: Add close button to menu and make that work too
        // TODO: Close menu on escape press

        document.getElementsByTagName('html')[0].classList.remove("nav-open");
        this.setState({isOpen: false})
        //this.toggleButtonRef.current.focus();
    }

    render() {
        return (
            <nav>
                <span className="menu-button">
                    <IconButton
                        ariaLabel="Open navigation menu"
                        ariaExpanded={this.state.isOpen}
                        icon="menu"
                        iconOnly
                        inverse
                        onClick={this.openMenu}
                        ref={this.toggleButtonRef}
                        size="large"
                        variant="link" />
                </span>
                <div className="main-nav">
                    <div className="main-nav-inner">
                    <div style={{"textAlign": "right"}}>
                            <IconButton
                                ariaLabel="Close navigation menu"
                                color="secondary"
                                icon="cross"
                                iconOnly
                                onClick={this.closeMenu}
                                variant="link" />
                        </div>
                        <MainNav />
                    </div>
                </div>
            </nav>
        );
    }
}