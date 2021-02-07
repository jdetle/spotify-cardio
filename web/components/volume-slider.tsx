import styled from "styled-components";

const VolumeIcon: React.FC = ({}) => {
  return (
    <button className="spoticon-volume-off-16 control-button volume-bar__icon" />
  );
};

const VolumeSlider: React.FC = ({}) => {
  return (
    <div>
      <VolumeIcon />
    </div>
  );
};

export default VolumeSlider;
