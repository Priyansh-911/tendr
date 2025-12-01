import { useSelector, useDispatch } from 'react-redux';
import {
  selectFormData,
  selectSelectedVendors,
  backToFormAction
} from '../redux/eventPlanningSlice';

const fmt = (d) => (d ? new Date(d).toLocaleDateString() : '—');
const rupee = (v) => (v ? `₹${Number(v).toLocaleString('en-IN')}` : '—');

export default function EventFormSummary() {
  const f = useSelector(selectFormData);
  const selected = useSelector(selectSelectedVendors);
  const dispatch = useDispatch();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-6 flex justify-center">
      <div className="w-full max-w-5xl rounded-3xl bg-white/95 shadow-md ring-1 ring-black/5 p-6 sm:p-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Your Event Details
          </h3>

          <button
            onClick={() => dispatch(backToFormAction())}
            className="px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 transition duration-200"
          >
            Edit details
          </button>
        </div>

        {/* DETAILS GRID */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Event Name */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Event Name
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {f.eventName || "—"}
            </dd>
          </div>

          {/* Event Type */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Event Type
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {f.eventType || "—"}
            </dd>
          </div>

          {/* Guests */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Guests
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {f.guests || "—"}
            </dd>
          </div>

          {/* Budget */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Budget
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {rupee(f.budget)}
            </dd>
          </div>

          {/* Location */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Location
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {f.location || "—"}
            </dd>
          </div>

          {/* Date */}
          <div className="border rounded-xl p-4 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Date
            </dt>
            <dd className="text-base font-semibold text-gray-800 mt-1">
              {fmt(f.date)}
            </dd>
          </div>

          {/* Additional Info */}
          <div className="border rounded-xl p-4 sm:col-span-2 lg:col-span-3 bg-white">
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              Additional Info
            </dt>
            <dd className="text-base text-gray-800 whitespace-pre-wrap mt-1">
              {f.additionalInfo || "—"}
            </dd>
          </div>
        </dl>

        {/* VENDORS COUNT */}
        <div className="mt-5 text-sm text-gray-700 bg-white py-3 px-4 rounded-xl border">
          <span className="font-semibold">Selected vendors:</span>{" "}
          {selected.length ? (
            <span className="text-gray-800 font-medium">
              {selected.length} added
            </span>
          ) : (
            <span className="text-gray-500">None yet</span>
          )}
        </div>
      </div>
    </section>
  );

}
