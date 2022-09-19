// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Structure.sol";

contract SupplyChain {
    event ManufacturerAdded(address indexed _account);

    //product code
    uint256 public uid;
    uint256 sku;

    address owner;

    mapping(uint256 => Structure.Product) products;
    mapping(address => Structure.Roles) roles;
    mapping(uint256 => Structure.TrackProduct) trackProduct;

    function hasManufacturerAdmin(address _account) public view returns (bool) {
        require(_account != address(0), "");
        return roles[_account].Manufacturer;
    }

    function addManufacturerAdmin(address _account) public {
        require(_account != address(0), "");
        require(!hasManufacturerAdmin(_account), "");

        roles[_account].Manufacturer = true;
    }

    function hasThirdPartyAdmin(address _account) public view returns (bool) {
        require(_account != address(0), "");
        return roles[_account].ThirdParty;
    }

    function addThirdPartyAdmin(address _account) public {
        require(_account != address(0), "");
        require(!hasThirdPartyAdmin(_account), "");

        roles[_account].ThirdParty = true;
    }

    function hasDeliveryAdmin(address _account) public view returns (bool) {
        require(_account != address(0), "");
        return roles[_account].Delivery;
    }

    function addDeliveryAdmin(address _account) public {
        require(_account != address(0), "Delivery not authorized");
        require(!hasDeliveryAdmin(_account), "Delivery needed");

        roles[_account].Delivery = true;
    }

    function hasCustomerAdmin(address _account) public view returns (bool) {
        require(_account != address(0), "Customer not authorized");
        return roles[_account].Customer;
    }

    function addCustomerAdmin(address _account) public {
        require(_account != address(0), "Customer not authorized");
        require(!hasDeliveryAdmin(_account), "Customer needed");

        roles[_account].Customer = true;
    }

    constructor() public payable {
        owner = msg.sender;
        sku = 1;
        uid = 1;
    }

    event ProductManufacture(uint256 uid);
    event PurchasedByThirdParty(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByThirdParty(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
    event ShippedByThirdParty(uint256 uid);
    event ReceivedByDelivery(uint256 uid);
    event ShippedByDelivery(uint256 uid);
    event ReceivedByCustomer(uint256 uid);

    modifier proveAddress(address add) {
        require(msg.sender == add, "");
        _;
    }

    modifier productManufacture(uint256 _uid) {
        require(products[_uid].productState == Structure.State.ProductManufacture, "Product manufactured");
        _;
    }

    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByManufacturer, "Product is shipped by manufacturer"
        );
        _;
    }

    modifier receivedByThirdParty(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByThirdParty, "Product is received by the third party"
        );
        _;
    }

    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByCustomer, "Product is purchased by the customer"
        );
        _;
    }

    modifier shippedByThirdParty(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByThirdParty, "Product is shipped by the third party"
        );
        _;
    }

    modifier receivedByDelivery(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByDelivery, "Product is received by the delivery"
        );
        _;
    }

    modifier shippedByDelivery(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByDelivery, "Product is shipped by the delivery"
        );
        _;
    }

    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByCustomer, "Product is received by the customer"
        );
        _;
    }

    function manufactureEmptyInitialize(Structure.Product memory product)
        internal
        pure
    {
        address thirdParty;
        string memory transaction;
        string memory thirdPartyLongitude;
        string memory thirdPartyLatitude;

        address delivery;
        string memory deliveryLongitude;
        string memory deliveryLatitude;
        address customer;

        product.thirdparty.thirdParty = thirdParty;
        product.thirdparty.thirdPartyLongitude = thirdPartyLongitude;
        product.thirdparty.thirdPartyLatitude = thirdPartyLatitude;

        product.delivery.delivery = delivery;
        product.delivery.deliveryLongitude = deliveryLongitude;
        product.delivery.deliveryLatitude = deliveryLatitude;

        product.customer = customer;
        product.transaction = transaction;
    }

    function manufactureProductInitialize(
        Structure.Product memory product,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) internal pure {
        product.productdet.productName = productName;
        product.productdet.productCode = productCode;
        product.productdet.productPrice = productPrice;
        product.productdet.productCategory = productCategory;
    }

    ///@dev STEP 1 : Manufactured a product.
    function manufactureProduct(
        string memory manufacturerName,
        string memory manufacturerDetails,
        string memory manufacturerLongitude,
        string memory manufacturerLatitude,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) public {
        require(hasManufacturerAdmin(msg.sender), "Manufacturer authorized");
        uint256 _uid = uid;
        Structure.Product memory product;
        product.sku = sku;
        product.uid = _uid;
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufacturerDetails;
        product.manufacturer.manufacturerLongitude = manufacturerLongitude;
        product.manufacturer.manufacturerLatitude = manufacturerLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;

        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;

        manufactureEmptyInitialize(product);

        product.productState = Structure.State.ProductManufacture;

        manufactureProductInitialize(
            product,
            productName,
            productCode,
            productPrice,
            productCategory
        );

        products[_uid] = product;

        trackProduct[_uid].history.push(product);

        sku++;
        uid = uid + 1;

        emit ProductManufacture(_uid);
    }

    ///@dev STEP 2 : Purchase of manufactured product by Third Party.
    function purchaseByThirdParty(uint256 _uid) public productManufacture(_uid) {
        require(hasThirdPartyAdmin(msg.sender), "");
        products[_uid].thirdparty.thirdParty = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByThirdParty;
        trackProduct[_uid].history.push(products[_uid]);

        emit PurchasedByThirdParty(_uid);
    }

    ///@dev STEP 3 : Purchased product ship to Third Party.
    function shipToThirdParty(uint256 _uid)
        public
        proveAddress(products[_uid].manufacturer.manufacturer)
    {
        require(hasManufacturerAdmin(msg.sender), "Manufacturer authorized");
        products[_uid].productState = Structure.State.ShippedByManufacturer;
        trackProduct[_uid].history.push(products[_uid]);

        emit ShippedByManufacturer(_uid);
    }

    ///@dev STEP 4 : Received the shipped purchased product from Manufacturer.
    function receiveByThirdParty(
        uint256 _uid,
        string memory thirdPartyLongitude,
        string memory thirdPartyLatitude
    )
        public
        shippedByManufacturer(_uid)
        proveAddress(products[_uid].thirdparty.thirdParty)
    {
        require(hasThirdPartyAdmin(msg.sender), "Third party authorized");
        products[_uid].owner = msg.sender;
        products[_uid].thirdparty.thirdPartyLongitude = thirdPartyLongitude;
        products[_uid].thirdparty.thirdPartyLatitude = thirdPartyLatitude;
        products[_uid].productState = Structure.State.ReceivedByThirdParty;
        trackProduct[_uid].history.push(products[_uid]);

        emit ReceivedByThirdParty(_uid);
    }

    ///@dev STEP 5 : Purchase of a product from third party by Customer.
    function purchaseByCustomer(uint256 _uid)
        public
        receivedByThirdParty(_uid)
    {
        require(hasCustomerAdmin(msg.sender), "Customer authorized");
        products[_uid].customer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByCustomer;
        trackProduct[_uid].history.push(products[_uid]);

        emit PurchasedByCustomer(_uid);
    }

    ///@dev STEP 7 : Shipping of purchased product to customer by third party.
    function shipByThirdParty(uint256 _uid)
        public
        proveAddress(products[_uid].owner)
        proveAddress(products[_uid].thirdparty.thirdParty)
    {
        require(hasThirdPartyAdmin(msg.sender), "Third party authorized");
        products[_uid].productState = Structure.State.ShippedByThirdParty;
        trackProduct[_uid].history.push(products[_uid]);

        emit ShippedByThirdParty(_uid);
    }

    ///@dev STEP 8 : Receiveing of customer purchased product by delivery.
    function receiveByDelivery(
        uint256 _uid,
        string memory deliveryLongitude,
        string memory deliveryLatitude
    ) public shippedByThirdParty(_uid) {
        require(hasDeliveryAdmin(msg.sender), "Delivery authorized");
        products[_uid].owner = msg.sender;
        products[_uid].delivery.delivery = msg.sender;
        products[_uid].delivery.deliveryLongitude = deliveryLongitude;
        products[_uid].delivery.deliveryLatitude = deliveryLatitude;
        products[_uid].productState = Structure.State.ReceivedByDelivery;
        trackProduct[_uid].history.push(products[_uid]);

        emit ReceivedByDelivery(_uid);
    }

    ///@dev STEP 9 : Shipping of customer purchased product by delivery.
    function shipByDelivery(uint256 _uid)
        public
        receivedByDelivery(_uid)
        proveAddress(products[_uid].owner)
        proveAddress(products[_uid].delivery.delivery)
    {
        require(hasDeliveryAdmin(msg.sender), "Delivery authorized");
        products[_uid].productState = Structure.State.ShippedByDelivery;
        trackProduct[_uid].history.push(products[_uid]);

        emit ShippedByDelivery(_uid);
    }

    ///@dev STEP 10 : Customer received the product.
    function receiveByCustomer(uint256 _uid)
        public
        shippedByDelivery(_uid)
        proveAddress(products[_uid].customer)
    {
        require(hasCustomerAdmin(msg.sender), "Customer authorized");
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByCustomer;
        trackProduct[_uid].history.push(products[_uid]);

        emit ReceivedByCustomer(_uid);
    }

    ///@dev Fetch product Item
    function fetchItemPart1(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0, "Product exit");
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = trackProduct[_uid].history[i];
        }
        return (
            product.uid,
            product.sku,
            product.owner,
            product.manufacturer.manufacturer,
            product.manufacturer.manufacturerName,
            product.manufacturer.manufacturerDetails,
            product.manufacturer.manufacturerLongitude,
            product.manufacturer.manufacturerLatitude
        );
    }

    ///@dev Fetch product Item
    function fetchItemPart2(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            Structure.State,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0, "Product exit");
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = trackProduct[_uid].history[i];
        }
        return (
            product.manufacturer.manufacturedDate,
            product.productdet.productName,
            product.productdet.productCode,
            product.productdet.productPrice,
            product.productdet.productCategory,
            product.productState,
            product.thirdparty.thirdParty,
            product.thirdparty.thirdPartyLongitude
        );
    }

    function fetchItemPart3(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            string memory,
            address,
            string memory,
            string memory,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0, "Product exit");
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = trackProduct[_uid].history[i];
        }
        return (
            product.thirdparty.thirdPartyLatitude,
            product.delivery.delivery,
            product.delivery.deliveryLongitude,
            product.delivery.deliveryLatitude,
            product.customer,
            product.transaction
        );
    }

    function fetchItemCount() public view returns (uint256) {
        return uid;
    }

    function fetchItemHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        return trackProduct[_uid].history.length;
    }

    function fetchItemState(uint256 _uid)
        public
        view
        returns (Structure.State)
    {
        return products[_uid].productState;
    }

    function setTransactionHashOnManufacture(string memory tran) public {
        trackProduct[uid - 1].history[
            trackProduct[uid - 1].history.length - 1
        ]
            .transaction = tran;
    }

    function setTransactionHash(uint256 _uid, string memory tran) public {
        Structure.Product storage p = trackProduct[_uid].history[
                trackProduct[_uid].history.length - 1
            ];
        p.transaction = tran;
    }
}
