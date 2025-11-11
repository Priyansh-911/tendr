import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/listingFiltersSlice.js";


import { useNavigate, useLocation } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import ListingsNav from "../../components/ListingsNav";
import PrimaryFilters_ListingPage from "../../components/PrimaryFilters_ListingPage";
import SecondaryFilters_ListingPage from "../../components/SecondaryFilters_ListingPage";
import VendorList_ListingPage from "../../components/VendorList_ListingPage";
import { useEffect, useState } from "react";
import { getVendors } from "../../apis/vendorApi";
import CompareBar from "../../components/CompareBar";
import CompareModal from "../../components/CompareModal";
import Footer from "../../components/Footer"; // ✅ Import reusable footer

const VendorList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const {
    eventType,
    serviceType,
    locationType,
    date,
    guestCount,
  } = useSelector((state) => state.listingFilters);

  const [vendorList, setVendorList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [secondaryFilters, setSecondaryFilters] = useState({});
  const [sortBy, setSortBy] = useState("rankingScore");
  const [sortOrder, setSortOrder] = useState("desc");

  // Compare
  const [compareSelected, setCompareSelected] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const toggleCompare = (vendor) => {
    setCompareSelected((prev) => {
      const exists = prev.find((v) => v._id === vendor._id);
      if (exists) return prev.filter((v) => v._id !== vendor._id);
      if (prev.length >= 2) return prev;
      return [...prev, vendor];
    });
  };
  const removeFromCompare = (id) =>
    setCompareSelected((prev) => prev.filter((v) => v._id !== id));
  const clearCompare = () => setCompareSelected([]);

  // NEW: modal to show selected vendors from top picks button
  const [isSelectedModalOpen, setIsSelectedModalOpen] = useState(false);

  // Booking review navigation after vendor selection
  const handleGoToBookingReview = () => {
    // Example: collect all event and vendor data here
    const bookingDetails = {
      eventName: eventType,
      service: serviceType,
      date: date,
      guests: guestCount,
      vendors: vendorList.filter(v => v.selected), // or your selection logic
      address: locationType,
      basePrice: 250, // replace with actual price logic
      customerId: localStorage.getItem("userId"),
      addons: [],
      amount: 250,
    };
    navigate('/booking/review', { state: { booking: bookingDetails } });
  };

  // fetch on changes
  useEffect(() => {
    if (!locationType || !serviceType) return;

    setIsLoading(true);
    const payload = {
      location: locationType,
      serviceTypes: [serviceType],
      sortBy,
      sortOrder,
      page: 1,
      limit: 10,
      serviceFilters: secondaryFilters, // <- send selected secondary filters
    };

    getVendors(payload)
      .then((data) => {
        setVendorList(data.vendors || []);
        setPaginationInfo(data.pagination || {});
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching vendors:", err))
      .finally(() => setIsLoading(false));
  }, [sortBy, sortOrder, secondaryFilters, locationType, serviceType]);

  const fetchPage = (pageNum) => {
    setIsLoading(true);
    const payload = {
      location: locationType,
      serviceTypes: [serviceType],
      sortBy,
      sortOrder,
      page: pageNum,
      limit: 10,
      serviceFilters: secondaryFilters,
    };
    getVendors(payload)
      .then((data) => {
        if (pageNum === 1) {
          setVendorList(data.vendors || []);
        } else {
          setVendorList((prev) => [...prev, ...(data.vendors || [])]);
        }
        setPaginationInfo(data.pagination || {});
        setCurrentPage(pageNum);
      })
      .catch((err) => console.error("Error fetching vendors:", err))
      .finally(() => setIsLoading(false));
  };

  const handleShowMore = () => fetchPage(currentPage + 1);

  const handleSearch = () => {
    if (!locationType || !serviceType) return;

    setIsLoading(true);
    const payload = {
      location: locationType,
      serviceTypes: [serviceType],
      sortBy,
      sortOrder,
      page: 1,
      limit: 10,
      serviceFilters: secondaryFilters,
    };

    getVendors(payload)
      .then((data) => {
        setVendorList(data.vendors || []);
        setPaginationInfo(data.pagination || {});
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching vendors:", err))
      .finally(() => setIsLoading(false));
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <ListingsNav />
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow-lg lg:shadow-none lg:border-r border-gray-200">
          <div className="p-4 lg:p-6">
            {/* Add button to go to booking review */}
            <button
              onClick={handleGoToBookingReview}
              className="mb-4 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 w-full"
            >
              Review & Continue Booking
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 lg:mb-6">
              Filters
            </h2>

            {/* Primary (unchanged) */}
            <div className="mb-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Primary Filters
              </h3>
              <PrimaryFilters_ListingPage onSearch={handleSearch} />
            </div>

            {/* Secondary (vendor-aware) */}
            <div className="mb-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Additional Filters
              </h3>
              <SecondaryFilters_ListingPage
                serviceType={serviceType}
                vendors={vendorList}
                onFiltersChange={setSecondaryFilters}
              />
            </div>

            {/* Apply Filters */}
            <button
              onClick={() => {
                setIsLoading(true);
                setCurrentPage(1);
                const p = {
                  location: locationType,
                  serviceTypes: [serviceType],
                  sortBy,
                  sortOrder,
                  page: 1,
                  limit: 10,
                  serviceFilters: secondaryFilters,
                };
                getVendors(p)
                  .then((data) => {
                    setVendorList(data.vendors || []);
                    setPaginationInfo(data.pagination || {});
                  })
                  .catch((err) => console.error("Error fetching vendors:", err))
                  .finally(() => setIsLoading(false));
              }}
              className="w-full bg-[#CCAB4A] text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-[#ab8f39] transition-colors duration-200 text-sm sm:text-base"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Header / Top picks bar with button */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                  {serviceType || "All"} Vendors
                </h1>

              </div>

              {/* NEW BUTTON */}
              <button
                onClick={() => setIsSelectedModalOpen(true)}
                disabled={compareSelected.length === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${compareSelected.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#CCAB4A] text-white hover:bg-[#ab8f39]"
                  }`}
                title={
                  compareSelected.length === 0
                    ? "No vendors selected yet"
                    : "Open selected vendors"
                }
              >
                Show Selected Vendors
                {compareSelected.length > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-2 text-white">
                    {compareSelected.length}
                  </span>
                )}
              </button>
            </div>

            {/* Chips row like "Top picks for …" (optional, basic) */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {serviceType && (
                <span className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {serviceType}
                </span>
              )}
              {locationType && (
                <span className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {locationType}
                </span>
              )}
              {date && (
                <span className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {date}
                </span>
              )}
              {guestCount ? (
                <span className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  {guestCount} guests
                </span>
              ) : null}
            </div>
          </div>

          <VendorList_ListingPage
            eventType={eventType}
            serviceType={serviceType}
            date={date}
            locationType={locationType}
            guestCount={guestCount}
            vendors={vendorList}
            paginationInfo={paginationInfo}
            handleShowMore={handleShowMore}
            isLoading={isLoading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            setSortBy={setSortBy}
            setSortOrder={setSortOrder}
            compareSelected={compareSelected}
            onToggleCompare={toggleCompare}
          />

          {paginationInfo && paginationInfo.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchPage(Math.max(1, currentPage - 1))}
                  disabled={isLoading || currentPage === 1}
                  className="px-3 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from(
                  { length: Math.min(5, paginationInfo.totalPages) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() =>
                          pageNum > currentPage ? handleShowMore() : fetchPage(pageNum)
                        }
                        className={`px-3 py-2 text-sm sm:text-base rounded-lg ${currentPage === pageNum
                          ? "bg-[#CCAB4A] text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={() => fetchPage(currentPage + 1)}
                  disabled={
                    isLoading ||
                    (paginationInfo.totalPages &&
                      currentPage >= paginationInfo.totalPages)
                  }
                  className="px-3 py-2 text-sm sm:text-base bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compare (existing) */}
      <CompareBar
        selected={compareSelected}
        onClear={clearCompare}
        onOpen={() => setIsCompareOpen(true)}
        onRemove={removeFromCompare}
      />
      <CompareModal
        open={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        vendors={compareSelected}
      />

      {/* NEW: Selected Vendors Modal */}
      {isSelectedModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={() => setIsSelectedModalOpen(false)}
        >
          <div
            className="w-[95%] max-w-3xl bg-white rounded-2xl shadow-xl p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Selected Vendors ({compareSelected.length})
              </h3>
              <button
                className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                onClick={() => setIsSelectedModalOpen(false)}
              >
                Close
              </button>
            </div>

            {compareSelected.length === 0 ? (
              <div className="text-gray-600 text-sm">
                No vendors selected yet. Use the “Compare” toggle on vendor cards.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {compareSelected.map((v) => (
                    <div
                      key={v._id}
                      className="border border-gray-200 rounded-xl p-4 flex gap-4 items-start"
                    >
                      <img
                        src={
                          v?.coverImage ||
                          v?.images?.[0] ||
                          "https://placehold.co/160x120?text=Vendor"
                        }
                        alt={v?.name || "Vendor"}
                        className="w-28 h-20 object-cover rounded-lg bg-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 truncate">
                          {v?.name || "Unnamed Vendor"}
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {v?.primaryService || serviceType}
                          {v?.city ? ` • ${v.city}` : ""}
                        </div>
                        {v?.startingPrice != null && (
                          <div className="text-sm text-gray-700 mt-1">
                            Starting from ₹{Number(v.startingPrice).toLocaleString("en-IN")}
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <button
                            className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
                            onClick={() => removeFromCompare(v._id)}
                          >
                            Remove
                          </button>
                          <button
                            className="text-xs px-3 py-1.5 rounded-lg bg-[#CCAB4A] text-white hover:bg-[#ab8f39]"
                            onClick={() => navigate(`/vendors/${v._id}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <button
                    onClick={clearCompare}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                  >
                    Clear All
                  </button>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-sm font-medium"
                      onClick={() => setIsSelectedModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg bg-[#CCAB4A] text-white hover:bg-[#ab8f39] text-sm font-semibold"
                      onClick={() => {
                        setIsSelectedModalOpen(false);
                        setIsCompareOpen(true); // quick jump to compare if needed
                      }}
                    >
                      Compare Them
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer (unchanged) */}
      
      <Footer />
    </div>
  );
};

export default VendorList;