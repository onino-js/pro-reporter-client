import * as React from "react";
import { inject, observer } from "mobx-react";
import { AllStores } from "../../../../models/all-stores.model";
import ProModal from "../../../../components/modals/ProModal";
import { ProContainer } from "../../../../components/layouts/ProContainer";

interface Props {
  show: boolean;
  close: () => void;
  onOk: () => void;
  list: any[];
}

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
        headerTitle={"A propos"}
        width={["50%", "100%"]}
        height={["auto", "auto"]}
        onOk={this.props.onOk}
      >
        <ProContainer>
          {this.props.list.map((item: string, index) => (
            <div key={"found-adresse-" + index}>{item}</div>
          ))}
        </ProContainer>
      </ProModal>
    );
  }
}

export default SingleAddressChoiceModal;
