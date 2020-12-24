import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  } // eof constructor 
  // [document.querySelectorAll(".swimlane-column")]
  componentDidMount(){
    var drake = Dragula(Array.from(document.getElementsByClassName('Swimlane-dragColumn')),{
      // copy:true ,
      revertOnSpill: true ,
      direction: 'vertical',
      
    }) ;
    drake.on('cancel',()=>{

    });
    drake.on('drop',function(el,target,source,sibling){
      // console.log(target.parentNode) ;
      // console.log(el) ;
      
      function getCardClass(cName){
        if (cName ==='Backlog'){
          return 'Card-grey' ;
        }
        else if(cName === 'In Progress'){
          return 'Card-blue' ;
        }
        else if (cName=== 'Complete'){
          return 'Card-green' ;
        }
      }

      if (target !== source){
        let bigC = target.parentNode.firstChild.innerHTML ;
        // console.log(getCardClass(bigC)) ;
        let old = source.parentNode.firstChild.innerHTML ;
        // console.log(getCardClass(old)) ;

        if (bigC ==='Backlog'){
         el.className = el.className.replace(getCardClass(old),getCardClass(bigC)) ;
        }
        else if (bigC ==='In Progress'){
          // el.className += 'Card-blue' ;
         el.className = el.className.replace(getCardClass(old),getCardClass(bigC)) ;

        }
        else if (bigC === 'Complete'){
          // el.className += 'Card-green' ;
         el.className = el.className.replace(getCardClass(old),getCardClass(bigC)) ;

        }
    }
    }) ;
    drake.end() ;
  }
  

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  } //eof getClients ;


  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref} />
    );
  } //eof renderSwimlane

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  } //eof render


  
}


