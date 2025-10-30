// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title UserRegistry for F1 PITWALL
/// @notice Minimal on-chain registry to associate an EOA with a display name
contract UserRegistry {
    struct Profile {
        string name;
        uint256 registeredAt;
    }

    mapping(address => Profile) private addressToProfile;

    event UserRegistered(address indexed user, string name);
    event UserNameUpdated(address indexed user, string name);

    /// @notice Register caller with a name. Reverts if already registered.
    function register(string calldata name) external {
        require(bytes(name).length > 0, "NAME_REQUIRED");
        Profile storage existing = addressToProfile[msg.sender];
        require(existing.registeredAt == 0, "ALREADY_REGISTERED");

        addressToProfile[msg.sender] = Profile({
            name: name,
            registeredAt: block.timestamp
        });

        emit UserRegistered(msg.sender, name);
    }

    /// @notice Update caller's name. Requires prior registration.
    function setName(string calldata name) external {
        require(bytes(name).length > 0, "NAME_REQUIRED");
        Profile storage existing = addressToProfile[msg.sender];
        require(existing.registeredAt != 0, "NOT_REGISTERED");

        existing.name = name;
        emit UserNameUpdated(msg.sender, name);
    }

    /// @notice View profile for any address.
    function getProfile(address user) external view returns (string memory name, uint256 registeredAt) {
        Profile storage p = addressToProfile[user];
        return (p.name, p.registeredAt);
    }

    /// @notice Convenience: is address registered
    function isRegistered(address user) external view returns (bool) {
        return addressToProfile[user].registeredAt != 0;
    }
}