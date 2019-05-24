import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import ProModal from "../../../../components/modals/ProModal";
import { ProContainer } from "../../../../components/layouts/ProContainer";
import styled from "../../../../styled-components";
import { Divider } from "antd";
import { SpiralSpinner } from "react-spinners-kit";
import { mainTheme } from "../../../../assets/styles/_colors";

interface Props {
  show: boolean;
  close: () => void;
  onSelect: (item: string) => void;
  list: any[];
  isPending: boolean;
}

const AdressItemChoice = styled.div`
  height: 40px;
  line-height: 40px;
  cursor: pointer;
`;

@inject((allStores: AllStores) => ({
  uiStore: allStores.uiStore,
}))
@observer
class SingleAddressChoiceModal extends React.Component<Props> {
  componentDidMount() {}
  public render() {
    return (
      <ProModal
        show={this.props.show!}
        close={this.props.close!}
        headerTitle={"Séléctionnez un lieu"}
        width={["auto", "100%"]}
        height={["auto", "auto"]}
      >
        <ProContainer>
          {this.props.isPending && (
            <SpiralSpinner
              size={100}
              frontColor={mainTheme.secondary}
              loading={true}
            />
          )}
          {!this.props.isPending &&
            (this.props.list.length !== 0 ? (
              this.props.list.map((item: string, index) => (
              <React.Fragment key={"found-adresse-" + index}>
                  <AdressItemChoice
                    onClick={() => this.props.onSelect(item)} >
                    {item}
                  </AdressItemChoice>
                  <Divider style={{ margin: "0px" }} />
                </React.Fragment>
              ))
            ) : (
              <p>Aucune adresse trouvée</p>
            ))}
        </ProContainer>
      </ProModal>
    );
  }
}

export default SingleAddressChoiceModal;
