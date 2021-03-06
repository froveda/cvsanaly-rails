require 'rails_helper'

describe FileType do
  it "has a valid factory" do
    expect(build(:file_type)).to be_valid
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:file) }
    it { is_expected.to validate_presence_of(:type) }
  end

  describe "without a file" do
    let(:object) { build(:file_type, file: nil) }
    it_behaves_like "validating presence", :file
  end

  describe "without a type" do
    let(:object) { build(:file_type, type: nil) }
    it_behaves_like "validating presence", :type
  end
end