// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

library Structure {
    enum State {
        ProductManufacture,
        PurchasedByThirdParty,
        ShippedByManufacturer,
        ReceivedByThirdParty,
        PurchasedByCustomer,
        ShippedByThirdParty,
        ReceivedByDelivery,
        ShippedByDelivery,
        ReceivedByCustomer
    }
    struct ManufactureInfos {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string manufacturerLongitude;
        string manufacturerLatitude;
        uint256 manufacturedDate;
    }
    struct ProductInfos {
        string productName;
        uint256 productCode;
        uint256 productPrice;
        string productCategory;
    }

    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ManufactureInfos manufacturer;
        ThirdPartyInfos thirdparty;
        ProductInfos productdet;
        DeliveryInfos delivery;
        address customer;
        string transaction;
    }

    struct TrackProduct {
        Product[] history;
    }
    
    struct ThirdPartyInfos {
        address thirdParty;
        string thirdPartyLongitude;
        string thirdPartyLatitude;
    }
    struct DeliveryInfos {
        address delivery;
        string deliveryLongitude;
        string deliveryLatitude;
    }

    struct Roles {
        bool Manufacturer;
        bool ThirdParty;
        bool Delivery;
        bool Customer;
    }
}
