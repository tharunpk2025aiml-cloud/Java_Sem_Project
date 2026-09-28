///* =====================================================
//   PARKSMART FRONTEND
//   Connects HTML interface to Spring Boot REST APIs
//===================================================== */
//
//
//const API = "/api";
//
//
///* =====================================================
//   PAGE INITIALIZATION
//===================================================== */
//
//document.addEventListener("DOMContentLoaded", () => {
//
//    loadParkingLots();
//
//    loadBookings();
//
//    setMinimumDateTime();
//
//});
//
//
///* =====================================================
//   MESSAGE SYSTEM
//===================================================== */
//
//function showMessage(message, type = "success") {
//
//    const box = document.getElementById("messageBox");
//
//    box.textContent = message;
//
//    box.className = "message " + type;
//
//    setTimeout(() => {
//
//        box.className = "message hidden";
//
//    }, 4000);
//}
//
//
///* =====================================================
//   DATE / TIME
//===================================================== */
//
//function setMinimumDateTime() {
//
//    const now = new Date();
//
//    now.setMinutes(
//        now.getMinutes() -
//        now.getTimezoneOffset()
//    );
//
//    const formatted =
//        now.toISOString().slice(0, 16);
//
//    document.getElementById(
//        "startTime"
//    ).min = formatted;
//
//    document.getElementById(
//        "endTime"
//    ).min = formatted;
//}
//
//
///* =====================================================
//   PARKING LOTS
//===================================================== */
//
//async function loadParkingLots() {
//
//    try {
//
//        const response =
//            await fetch(
//                `${API}/parking-lots`
//            );
//
//        if (!response.ok) {
//
//            throw new Error(
//                "Unable to load parking lots"
//            );
//        }
//
//        const lots =
//            await response.json();
//
//
//        /* Update total lots */
//
//        document.getElementById(
//            "totalLots"
//        ).textContent = lots.length;
//
//
//        /* Select boxes */
//
//        const slotLot =
//            document.getElementById(
//                "slotLot"
//            );
//
//        const bookingLot =
//            document.getElementById(
//                "bookingLot"
//            );
//
//
//        slotLot.innerHTML =
//            `<option value="">
//                Select parking lot
//            </option>`;
//
//        bookingLot.innerHTML =
//            `<option value="">
//                Select parking lot
//            </option>`;
//
//
//        lots.forEach(lot => {
//
//            const option1 =
//                document.createElement("option");
//
//            option1.value = lot.id;
//
//            option1.textContent =
//                `${lot.name} - ${lot.location}`;
//
//            slotLot.appendChild(option1);
//
//
//            const option2 =
//                document.createElement("option");
//
//            option2.value = lot.id;
//
//            option2.textContent =
//                `${lot.name} - ${lot.location}`;
//
//            bookingLot.appendChild(option2);
//
//        });
//
//
//        /* Load slots */
//
//        await loadAllSlots(lots);
//
//
//    } catch (error) {
//
//        console.error(error);
//
//        showMessage(
//            error.message,
//            "error"
//        );
//    }
//}
//
//
///* =====================================================
//   LOAD ALL SLOTS
//===================================================== */
//
//async function loadAllSlots(lots) {
//
//    let totalSlots = 0;
//
//    for (const lot of lots) {
//
//        try {
//
//            const response =
//                await fetch(
//                    `${API}/slots/lot/${lot.id}`
//                );
//
//            if (response.ok) {
//
//                const slots =
//                    await response.json();
//
//                totalSlots += slots.length;
//            }
//
//        } catch (error) {
//
//            console.error(error);
//        }
//    }
//
//
//    document.getElementById(
//        "totalSlots"
//    ).textContent = totalSlots;
//}
//
//
///* =====================================================
//   CREATE PARKING LOT
//===================================================== */
//
//document.getElementById(
//    "lotForm"
//).addEventListener(
//    "submit",
//    async function(event) {
//
//        event.preventDefault();
//
//
//        const data = {
//
//            name:
//                document.getElementById(
//                    "lotName"
//                ).value,
//
//            location:
//                document.getElementById(
//                    "lotLocation"
//                ).value,
//
//            overstayRatePerHour:
//                Number(
//                    document.getElementById(
//                        "overstayRate"
//                    ).value
//                )
//        };
//
//
//        try {
//
//            const response =
//                await fetch(
//                    `${API}/parking-lots`,
//                    {
//
//                        method: "POST",
//
//                        headers: {
//                            "Content-Type":
//                                "application/json"
//                        },
//
//                        body:
//                            JSON.stringify(data)
//                    }
//                );
//
//
//            const result =
//                await response.json();
//
//
//            if (!response.ok) {
//
//                throw new Error(
//                    result.message ||
//                    "Unable to create parking lot"
//                );
//            }
//
//
//            showMessage(
//                "Parking lot created successfully!"
//            );
//
//
//            this.reset();
//
//
//            await loadParkingLots();
//
//
//        } catch (error) {
//
//            console.error(error);
//
//            showMessage(
//                error.message,
//                "error"
//            );
//        }
//
//    }
//);
//
//
///* =====================================================
//   CREATE SLOT
//===================================================== */
//
//document.getElementById(
//    "slotForm"
//).addEventListener(
//    "submit",
//    async function(event) {
//
//        event.preventDefault();
//
//
//        const data = {
//
//            slotNumber:
//                document.getElementById(
//                    "slotNumber"
//                ).value,
//
//            parkingLotId:
//                Number(
//                    document.getElementById(
//                        "slotLot"
//                    ).value
//                )
//        };
//
//
//        try {
//
//            const response =
//                await fetch(
//                    `${API}/slots`,
//                    {
//
//                        method: "POST",
//
//                        headers: {
//                            "Content-Type":
//                                "application/json"
//                        },
//
//                        body:
//                            JSON.stringify(data)
//                    }
//                );
//
//
//            const result =
//                await response.json();
//
//
//            if (!response.ok) {
//
//                throw new Error(
//                    result.message ||
//                    "Unable to create slot"
//                );
//            }
//
//
//            showMessage(
//                "Parking slot added successfully!"
//            );
//
//
//            this.reset();
//
//
//            await loadParkingLots();
//
//
//        } catch (error) {
//
//            console.error(error);
//
//            showMessage(
//                error.message,
//                "error"
//            );
//        }
//
//    }
//);
//
//
///* =====================================================
//   CHECK AVAILABLE SLOTS
//===================================================== */
//
//document.getElementById(
//    "checkAvailabilityBtn"
//).addEventListener(
//    "click",
//    async function() {
//
//        const lotId =
//            document.getElementById(
//                "bookingLot"
//            ).value;
//
//        const start =
//            document.getElementById(
//                "startTime"
//            ).value;
//
//        const end =
//            document.getElementById(
//                "endTime"
//            ).value;
//
//
//        if (!lotId || !start || !end) {
//
//            showMessage(
//                "Please select parking lot, start time and end time.",
//                "error"
//            );
//
//            return;
//        }
//
//
//        if (new Date(end) <= new Date(start)) {
//
//            showMessage(
//                "End time must be after start time.",
//                "error"
//            );
//
//            return;
//        }
//
//
//        try {
//
//            const url =
//                `${API}/bookings/available-slots` +
//                `?parkingLotId=${lotId}` +
//                `&startTime=${encodeURIComponent(start)}` +
//                `&endTime=${encodeURIComponent(end)}`;
//
//
//            const response =
//                await fetch(url);
//
//
//            const slots =
//                await response.json();
//
//
//            if (!response.ok) {
//
//                throw new Error(
//                    slots.message ||
//                    "Unable to find slots"
//                );
//            }
//
//
//            const select =
//                document.getElementById(
//                    "bookingSlot"
//                );
//
//
//            select.innerHTML =
//                `<option value="">
//                    Select available slot
//                </option>`;
//
//
//            slots.forEach(slot => {
//
//                const option =
//                    document.createElement(
//                        "option"
//                    );
//
//                option.value = slot.id;
//
//                option.textContent =
//                    slot.slotNumber;
//
//                select.appendChild(option);
//
//            });
//
//
//            document.getElementById(
//                "availableSlots"
//            ).textContent =
//                slots.length;
//
//
//            if (slots.length === 0) {
//
//                showMessage(
//                    "No slots available for this time window.",
//                    "error"
//                );
//
//            } else {
//
//                showMessage(
//                    `${slots.length} slot(s) available.`
//                );
//            }
//
//
//        } catch (error) {
//
//            console.error(error);
//
//            showMessage(
//                error.message,
//                "error"
//            );
//        }
//
//    }
//);
//
//
///* =====================================================
//   CREATE BOOKING
//===================================================== */
//
//document.getElementById(
//    "bookingForm"
//).addEventListener(
//    "submit",
//    async function(event) {
//
//        event.preventDefault();
//
//
//        const data = {
//
//            customerName:
//                document.getElementById(
//                    "customerName"
//                ).value,
//
//            vehicleNumber:
//                document.getElementById(
//                    "vehicleNumber"
//                ).value,
//
//            slotId:
//                Number(
//                    document.getElementById(
//                        "bookingSlot"
//                    ).value
//                ),
//
//            startTime:
//                document.getElementById(
//                    "startTime"
//                ).value,
//
//            endTime:
//                document.getElementById(
//                    "endTime"
//                ).value
//        };
//
//
//        if (!data.slotId) {
//
//            showMessage(
//                "Please select an available slot first.",
//                "error"
//            );
//
//            return;
//        }
//
//
//        if (
//            new Date(data.endTime) <=
//            new Date(data.startTime)
//        ) {
//
//            showMessage(
//                "End time must be after start time.",
//                "error"
//            );
//
//            return;
//        }
//
//
//        try {
//
//            const response =
//                await fetch(
//                    `${API}/bookings`,
//                    {
//
//                        method: "POST",
//
//                        headers: {
//                            "Content-Type":
//                                "application/json"
//                        },
//
//                        body:
//                            JSON.stringify(data)
//                    }
//                );
//
//
//            const result =
//                await response.json();
//
//
//            if (!response.ok) {
//
//                throw new Error(
//                    result.message ||
//                    "Unable to create booking"
//                );
//            }
//
//
//            showMessage(
//                `Booking created successfully! Booking ID: ${result.id}`
//            );
//
//
//            this.reset();
//
//
//            document.getElementById(
//                "bookingSlot"
//            ).innerHTML =
//                `<option value="">
//                    Select available slot
//                </option>`;
//
//
//            await loadBookings();
//
//
//        } catch (error) {
//
//            console.error(error);
//
//            showMessage(
//                error.message,
//                "error"
//            );
//        }
//
//    }
//);
//
//
///* =====================================================
//   LOAD BOOKINGS
//===================================================== */
//
//async function loadBookings() {
//
//    try {
//
//        const response =
//            await fetch(
//                `${API}/bookings`
//            );
//
//
//        if (!response.ok) {
//
//            throw new Error(
//                "Unable to load bookings"
//            );
//        }
//
//
//        const bookings =
//            await response.json();
//
//
//        const table =
//            document.getElementById(
//                "bookingTable"
//            );
//
//
//        table.innerHTML = "";
//
//
//        if (bookings.length === 0) {
//
//            table.innerHTML =
//                `<tr>
//                    <td colspan="8" class="empty">
//                        No bookings found
//                    </td>
//                </tr>`;
//
//            return;
//        }
//
//
//        bookings.forEach(booking => {
//
//            const row =
//                document.createElement("tr");
//
//
//            let actions = "";
//
//
//            if (
//                booking.status ===
//                "RESERVED"
//            ) {
//
//                actions =
//                    `<button
//                        class="action-btn"
//                        onclick="checkIn(${booking.id})">
//                        Check In
//                    </button>`;
//            }
//
//
//            if (
//                booking.status ===
//                "CHECKED_IN"
//            ) {
//
//                actions =
//                    `<button
//                        class="action-btn check-out-btn"
//                        onclick="checkOut(${booking.id})">
//                        Check Out
//                    </button>`;
//            }
//
//
//            row.innerHTML = `
//
//                <td>
//                    #${booking.id}
//                </td>
//
//                <td>
//                    ${booking.customerName}
//                </td>
//
//                <td>
//                    ${booking.vehicleNumber}
//                </td>
//
//                <td>
//                    ${booking.slot
//                        ? booking.slot.slotNumber
//                        : "-"}
//                </td>
//
//                <td>
//                    ${formatDate(booking.startTime)}
//                </td>
//
//                <td>
//                    ${formatDate(booking.endTime)}
//                </td>
//
//                <td>
//                    <span class="status ${booking.status}">
//                        ${booking.status.replace(
//                            "_",
//                            " "
//                        )}
//                    </span>
//                </td>
//
//                <td>
//                    ${actions}
//                </td>
//
//            `;
//
//
//            table.appendChild(row);
//
//        });
//
//
//    } catch (error) {
//
//        console.error(error);
//
//    }
//}
//
//
///* =====================================================
//   CHECK IN
//===================================================== */
//
//async function checkIn(bookingId) {
//
//    try {
//
//        const response =
//            await fetch(
//                `${API}/check-in-out/${bookingId}/check-in`,
//                {
//                    method: "POST"
//                }
//            );
//
//
//        const result =
//            await response.json();
//
//
//        if (!response.ok) {
//
//            throw new Error(
//                result.message ||
//                "Unable to check in"
//            );
//        }
//
//
//        showMessage(
//            "Vehicle checked in successfully!"
//        );
//
//
//        await loadBookings();
//
//
//        updateOccupancy();
//
//
//    } catch (error) {
//
//        console.error(error);
//
//        showMessage(
//            error.message,
//            "error"
//        );
//    }
//}
//
//
///* =====================================================
//   CHECK OUT
//===================================================== */
//
//async function checkOut(bookingId) {
//
//    try {
//
//        const response =
//            await fetch(
//                `${API}/check-in-out/${bookingId}/check-out`,
//                {
//                    method: "POST"
//                }
//            );
//
//
//        const result =
//            await response.json();
//
//
//        if (!response.ok) {
//
//            throw new Error(
//                result.message ||
//                "Unable to check out"
//            );
//        }
//
//
//        if (result.penalty > 0) {
//
//            showMessage(
//                `Checkout completed. Overstay: ${result.overstayMinutes} minutes. Penalty: ₹${result.penalty}`,
//                "error"
//            );
//
//        } else {
//
//            showMessage(
//                "Checkout completed without penalty."
//            );
//        }
//
//
//        await loadBookings();
//
//
//        updateOccupancy();
//
//
//    } catch (error) {
//
//        console.error(error);
//
//        showMessage(
//            error.message,
//            "error"
//        );
//    }
//}
//
//
///* =====================================================
//   OCCUPANCY
//===================================================== */
//
//document.getElementById(
//    "bookingLot"
//).addEventListener(
//    "change",
//    updateOccupancy
//);
//
//
//async function updateOccupancy() {
//
//    const lotId =
//        document.getElementById(
//            "bookingLot"
//        ).value;
//
//
//    if (!lotId) {
//
//        document.getElementById(
//            "occupancyCount"
//        ).textContent = "0";
//
//        document.getElementById(
//            "occupancyText"
//        ).textContent =
//            "Select a parking lot to view current occupancy.";
//
//        return;
//    }
//
//
//    try {
//
//        const response =
//            await fetch(
//                `${API}/parking-lots/${lotId}/occupancy`
//            );
//
//
//        const occupancy =
//            await response.json();
//
//
//        if (!response.ok) {
//
//            throw new Error(
//                "Unable to load occupancy"
//            );
//        }
//
//
//        document.getElementById(
//            "occupancyCount"
//        ).textContent =
//            occupancy;
//
//
//        document.getElementById(
//            "occupancyText"
//        ).textContent =
//            `${occupancy} vehicle(s) are currently checked in.`;
//
//    } catch (error) {
//
//        console.error(error);
//    }
//}
//
//
///* =====================================================
//   DATE FORMATTER
//===================================================== */
//
//function formatDate(dateString) {
//
//    if (!dateString) {
//        return "-";
//    }
//
//
//    const date =
//        new Date(dateString);
//
//
//    return date.toLocaleString(
//        "en-IN",
//        {
//            day: "2-digit",
//            month: "short",
//            year: "numeric",
//            hour: "2-digit",
//            minute: "2-digit"
//        }
//    );
//}
//
//
///* =====================================================
//   AUTOMATIC REFRESH
//===================================================== */
//
//setInterval(
//    async () => {
//
//        await loadBookings();
//
//        await loadParkingLots();
//
//        await updateOccupancy();
//
//    },
//    15000
//);

/* =====================================================
   PARKSMART FRONTEND
   Spring Boot REST API + Browser Frontend
===================================================== */

const API = "/api";


/* =====================================================
   PAGE INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadParkingLots();

    loadBookings();

    setMinimumDateTime();

    updateTotalOccupancy();

});


/* =====================================================
   MESSAGE SYSTEM
===================================================== */

function showMessage(message, type = "success") {

    const box = document.getElementById("messageBox");

    box.textContent = message;

    box.className = "message " + type;

    setTimeout(() => {

        box.className = "message hidden";

    }, 4000);
}


/* =====================================================
   DATE / TIME
===================================================== */

function setMinimumDateTime() {

    const now = new Date();

    now.setMinutes(
        now.getMinutes() -
        now.getTimezoneOffset()
    );

    const startFormatted =
        now.toISOString().slice(0, 16);


    const startInput =
        document.getElementById("startTime");

    const endInput =
        document.getElementById("endTime");


    startInput.min = startFormatted;

    endInput.min = startFormatted;


    /*
     * Default start time = current time
     */
    startInput.value = startFormatted;


    /*
     * Default end time = 1 hour after start
     */
    const end =
        new Date(
            now.getTime() +
            60 * 60 * 1000
        );


    const endFormatted =
        end.toISOString().slice(0, 16);


    endInput.value = endFormatted;
}


/* =====================================================
   START TIME CHANGE
   Automatically adjust END TIME
===================================================== */

document.getElementById("startTime")
    .addEventListener("change", function () {

        const start =
            new Date(this.value);


        if (isNaN(start.getTime())) {

            return;
        }


        /*
         * Minimum end time is 1 hour
         * after the selected start time.
         */
        const minimumEnd =
            new Date(
                start.getTime() +
                60 * 60 * 1000
            );


        const endFormatted =
            minimumEnd
                .toISOString()
                .slice(0, 16);


        const endInput =
            document.getElementById("endTime");


        endInput.min =
            endFormatted;


        /*
         * If current end time is before
         * the new start time, correct it.
         */
        if (
            !endInput.value ||
            new Date(endInput.value) <= start
        ) {

            endInput.value =
                endFormatted;
        }

    });


/* =====================================================
   PARKING LOTS
===================================================== */

async function loadParkingLots() {

    try {

        const response =
            await fetch(
                `${API}/parking-lots`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load parking lots"
            );
        }


        const lots =
            await response.json();


        /*
         * Update total parking lots.
         */
        document.getElementById(
            "totalLots"
        ).textContent = lots.length;


        /*
         * Get dropdown elements.
         */
        const slotLot =
            document.getElementById(
                "slotLot"
            );

        const bookingLot =
            document.getElementById(
                "bookingLot"
            );


        /*
         * Clear existing options.
         */
        slotLot.innerHTML =
            `<option value="">
                Select parking lot
            </option>`;


        bookingLot.innerHTML =
            `<option value="">
                Select parking lot
            </option>`;


        /*
         * Add parking lots to both dropdowns.
         */
        lots.forEach(lot => {

            const option1 =
                document.createElement("option");


            option1.value =
                lot.id;


            option1.textContent =
                `${lot.name} - ${lot.location}`;


            slotLot.appendChild(
                option1
            );


            const option2 =
                document.createElement("option");


            option2.value =
                lot.id;


            option2.textContent =
                `${lot.name} - ${lot.location}`;


            bookingLot.appendChild(
                option2
            );

        });


        /*
         * Load total slots.
         */
        await loadAllSlots(lots);


    } catch (error) {

        console.error(
            "Parking lot error:",
            error
        );


        showMessage(
            error.message,
            "error"
        );
    }
}


/* =====================================================
   LOAD ALL SLOTS
===================================================== */

async function loadAllSlots(lots) {

    let totalSlots = 0;


    for (const lot of lots) {

        try {

            const response =
                await fetch(
                    `${API}/slots/lot/${lot.id}`
                );


            if (response.ok) {

                const slots =
                    await response.json();


                totalSlots +=
                    slots.length;
            }


        } catch (error) {

            console.error(
                "Error loading slots:",
                error
            );
        }
    }


    /*
     * Update Total Slots card.
     */
    document.getElementById(
        "totalSlots"
    ).textContent =
        totalSlots;


    /*
     * Update Occupied and Available.
     */
    await updateTotalOccupancy(
        totalSlots
    );
}


/* =====================================================
   UPDATE TOTAL OCCUPANCY
===================================================== */

async function updateTotalOccupancy(
    totalSlots = null
) {

    try {

        const response =
            await fetch(
                "/api/parking-lots/occupancy"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load occupancy"
            );
        }


        /*
         * Backend returns the number
         * of CHECKED_IN bookings.
         */
        const occupied =
            await response.json();


        /*
         * Update Occupied card.
         */
        document.getElementById(
            "occupiedSlots"
        ).textContent =
            occupied;


        /*
         * If total slots is supplied,
         * calculate available slots.
         */
        if (totalSlots !== null) {

            const available =
                Math.max(
                    0,
                    totalSlots - occupied
                );


            document.getElementById(
                "availableSlots"
            ).textContent =
                available;
        }


    } catch (error) {

        console.error(
            "Occupancy error:",
            error
        );
    }
}


/* =====================================================
   CREATE PARKING LOT
===================================================== */

document.getElementById(
    "lotForm"
).addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const data = {

            name:
                document.getElementById(
                    "lotName"
                ).value,

            location:
                document.getElementById(
                    "lotLocation"
                ).value,

            overstayRatePerHour:
                Number(
                    document.getElementById(
                        "overstayRate"
                    ).value
                )
        };


        try {

            const response =
                await fetch(
                    `${API}/parking-lots`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            let result = null;


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                result =
                    await response.json();

            } else {

                const text =
                    await response.text();

                console.error(
                    "Server response:",
                    text
                );
            }


            if (!response.ok) {

                throw new Error(
                    result?.message ||
                    `Unable to create parking lot (${response.status})`
                );
            }


            showMessage(
                "Parking lot created successfully!"
            );


            this.reset();


            await loadParkingLots();


        } catch (error) {

            console.error(error);


            showMessage(
                error.message,
                "error"
            );
        }

    }
);


/* =====================================================
   CREATE PARKING SLOT
===================================================== */

document.getElementById(
    "slotForm"
).addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const parkingLotId =
            Number(
                document.getElementById(
                    "slotLot"
                ).value
            );


        const slotNumber =
            document.getElementById(
                "slotNumber"
            ).value.trim();


        /*
         * Validate parking lot.
         */
        if (!parkingLotId) {

            showMessage(
                "Please select a parking lot.",
                "error"
            );

            return;
        }


        /*
         * Validate slot number.
         */
        if (!slotNumber) {

            showMessage(
                "Please enter a slot number.",
                "error"
            );

            return;
        }


        const data = {

            slotNumber:
                slotNumber,

            parkingLotId:
                parkingLotId
        };


        try {

            const response =
                await fetch(
                    `${API}/slots`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            let result = null;


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                result =
                    await response.json();

            } else {

                const text =
                    await response.text();

                console.error(
                    "Server response:",
                    text
                );
            }


            if (!response.ok) {

                throw new Error(
                    result?.message ||
                    `Unable to create slot (${response.status})`
                );
            }


            showMessage(
                "Parking slot added successfully!"
            );


            this.reset();


            await loadParkingLots();


        } catch (error) {

            console.error(error);


            showMessage(
                error.message,
                "error"
            );
        }

    }
);


/* =====================================================
   CHECK AVAILABLE SLOTS
===================================================== */

document.getElementById(
    "checkAvailabilityBtn"
).addEventListener(
    "click",
    async function() {

        const lotId =
            document.getElementById(
                "bookingLot"
            ).value;


        const start =
            document.getElementById(
                "startTime"
            ).value;


        const end =
            document.getElementById(
                "endTime"
            ).value;


        /*
         * Parking lot validation.
         */
        if (!lotId) {

            showMessage(
                "Please select a parking lot first.",
                "error"
            );

            return;
        }


        /*
         * Time validation.
         */
        if (!start || !end) {

            showMessage(
                "Please select start and end time.",
                "error"
            );

            return;
        }


        if (
            new Date(end) <=
            new Date(start)
        ) {

            showMessage(
                "End time must be after start time.",
                "error"
            );

            return;
        }


        try {

            const url =
                `${API}/bookings/available-slots` +
                `?parkingLotId=${lotId}` +
                `&startTime=${encodeURIComponent(start)}` +
                `&endTime=${encodeURIComponent(end)}`;


            const response =
                await fetch(url);


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            let slots = [];


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                slots =
                    await response.json();

            } else {

                const text =
                    await response.text();

                console.error(
                    "Server response:",
                    text
                );

                throw new Error(
                    `Server returned an unexpected response (${response.status})`
                );
            }


            if (!response.ok) {

                throw new Error(
                    "Unable to find available slots."
                );
            }


            const select =
                document.getElementById(
                    "bookingSlot"
                );


            select.innerHTML =
                `<option value="">
                    Select available slot
                </option>`;


            slots.forEach(slot => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    slot.id;


                option.textContent =
                    slot.slotNumber;


                select.appendChild(
                    option
                );

            });


            /*
             * NOTE:
             * We intentionally DO NOT update
             * the dashboard's Available Slots
             * here.
             *
             * Dashboard Available Slots means:
             *
             * Total Slots - Occupied
             *
             * The selected booking window is
             * separate from dashboard occupancy.
             */


            if (slots.length === 0) {

                showMessage(
                    "No slots available for this time window.",
                    "error"
                );

            } else {

                showMessage(
                    `${slots.length} slot(s) available.`
                );
            }


        } catch (error) {

            console.error(error);


            showMessage(
                error.message,
                "error"
            );
        }

    }
);


/* =====================================================
   CREATE BOOKING
===================================================== */

document.getElementById(
    "bookingForm"
).addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const lotId =
            document.getElementById(
                "bookingLot"
            ).value;


        const slotId =
            document.getElementById(
                "bookingSlot"
            ).value;


        const startTime =
            document.getElementById(
                "startTime"
            ).value;


        const endTime =
            document.getElementById(
                "endTime"
            ).value;


        /*
         * Parking lot validation.
         */
        if (!lotId) {

            showMessage(
                "Please select a parking lot first.",
                "error"
            );

            return;
        }


        /*
         * Slot validation.
         */
        if (!slotId) {

            showMessage(
                "Please check availability and select a parking slot.",
                "error"
            );

            return;
        }


        /*
         * Time validation.
         */
        if (
            !startTime ||
            !endTime
        ) {

            showMessage(
                "Please select start and end time.",
                "error"
            );

            return;
        }


        if (
            new Date(endTime) <=
            new Date(startTime)
        ) {

            showMessage(
                "End time must be after start time.",
                "error"
            );

            return;
        }


        const data = {

            customerName:
                document.getElementById(
                    "customerName"
                ).value.trim(),

            vehicleNumber:
                document.getElementById(
                    "vehicleNumber"
                ).value.trim(),

            slotId:
                Number(slotId),

            startTime:
                startTime,

            endTime:
                endTime
        };


        /*
         * Customer validation.
         */
        if (!data.customerName) {

            showMessage(
                "Please enter customer name.",
                "error"
            );

            return;
        }


        /*
         * Vehicle validation.
         */
        if (!data.vehicleNumber) {

            showMessage(
                "Please enter vehicle number.",
                "error"
            );

            return;
        }


        try {

            const response =
                await fetch(
                    `${API}/bookings`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const contentType =
                response.headers.get(
                    "content-type"
                ) || "";


            let result = null;


            if (
                contentType.includes(
                    "application/json"
                )
            ) {

                result =
                    await response.json();

            } else {

                const text =
                    await response.text();

                console.error(
                    "Server response:",
                    text
                );
            }


            if (!response.ok) {

                throw new Error(
                    result?.message ||
                    `Unable to create booking (${response.status})`
                );
            }


            showMessage(
                `Booking created successfully! Booking ID: ${result.id}`
            );


            this.reset();


            /*
             * Reset available slot dropdown.
             */
            document.getElementById(
                "bookingSlot"
            ).innerHTML =
                `<option value="">
                    Select available slot
                </option>`;


            /*
             * Reset date/time fields.
             */
            setMinimumDateTime();


            /*
             * Refresh bookings.
             */
            await loadBookings();


            /*
             * Refresh dashboard occupancy.
             */
            await updateTotalOccupancy(
                Number(
                    document.getElementById(
                        "totalSlots"
                    ).textContent
                )
            );


        } catch (error) {

            console.error(error);


            showMessage(
                error.message,
                "error"
            );
        }

    }
);


/* =====================================================
   LOAD BOOKINGS
===================================================== */

async function loadBookings() {

    try {

        const response =
            await fetch(
                `${API}/bookings`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load bookings"
            );
        }


        const bookings =
            await response.json();


        const table =
            document.getElementById(
                "bookingTable"
            );


        table.innerHTML = "";


        if (bookings.length === 0) {

            table.innerHTML =
                `<tr>
                    <td colspan="8" class="empty">
                        No bookings found
                    </td>
                </tr>`;

            return;
        }


        bookings.forEach(
            booking => {

                const row =
                    document.createElement(
                        "tr"
                    );


                let actions = "";


                /*
                 * RESERVED → Check In
                 */
                if (
                    booking.status ===
                    "RESERVED"
                ) {

                    actions =
                        `<button
                            class="action-btn"
                            onclick="checkIn(${booking.id})">
                            Check In
                        </button>`;
                }


                /*
                 * CHECKED_IN → Check Out
                 */
                if (
                    booking.status ===
                    "CHECKED_IN"
                ) {

                    actions =
                        `<button
                            class="action-btn check-out-btn"
                            onclick="checkOut(${booking.id})">
                            Check Out
                        </button>`;
                }


                row.innerHTML = `

                    <td>
                        #${booking.id}
                    </td>

                    <td>
                        ${booking.customerName}
                    </td>

                    <td>
                        ${booking.vehicleNumber}
                    </td>

                    <td>
                        ${
                            booking.slot
                                ? booking.slot.slotNumber
                                : "-"
                        }
                    </td>

                    <td>
                        ${formatDate(
                            booking.startTime
                        )}
                    </td>

                    <td>
                        ${formatDate(
                            booking.endTime
                        )}
                    </td>

                    <td>
                        <span
                            class="status ${booking.status}">
                            ${booking.status.replace(
                                "_",
                                " "
                            )}
                        </span>
                    </td>

                    <td>
                        ${actions}
                    </td>

                `;


                table.appendChild(row);

            }
        );


    } catch (error) {

        console.error(
            "Booking loading error:",
            error
        );
    }
}


/* =====================================================
   CHECK IN
===================================================== */

async function checkIn(bookingId) {

    try {

        const response =
            await fetch(
                `${API}/check-in-out/${bookingId}/check-in`,
                {
                    method: "POST"
                }
            );


        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        let result = null;


        if (
            contentType.includes(
                "application/json"
            )
        ) {

            result =
                await response.json();

        } else {

            const text =
                await response.text();

            console.error(
                "Server response:",
                text
            );
        }


        if (!response.ok) {

            throw new Error(
                result?.message ||
                "Unable to check in"
            );
        }


        showMessage(
            "Vehicle checked in successfully!"
        );


        /*
         * Refresh booking table.
         */
        await loadBookings();


        /*
         * Refresh selected lot occupancy.
         */
        await updateOccupancy();


        /*
         * Refresh dashboard occupancy.
         *
         * This is the important fix.
         */
        await updateTotalOccupancy(
            Number(
                document.getElementById(
                    "totalSlots"
                ).textContent
            )
        );


    } catch (error) {

        console.error(error);


        showMessage(
            error.message,
            "error"
        );
    }
}


/* =====================================================
   CHECK OUT
===================================================== */

async function checkOut(bookingId) {

    try {

        const response =
            await fetch(
                `${API}/check-in-out/${bookingId}/check-out`,
                {
                    method: "POST"
                }
            );


        const contentType =
            response.headers.get(
                "content-type"
            ) || "";


        let result = null;


        if (
            contentType.includes(
                "application/json"
            )
        ) {

            result =
                await response.json();

        } else {

            const text =
                await response.text();

            console.error(
                "Server response:",
                text
            );
        }


        if (!response.ok) {

            throw new Error(
                result?.message ||
                "Unable to check out"
            );
        }


        /*
         * Show overstay information.
         */
        if (
            result &&
            result.penalty > 0
        ) {

            showMessage(
                `Checkout completed. Overstay: ${result.overstayMinutes} minutes. Penalty: ₹${result.penalty}`,
                "error"
            );

        } else {

            showMessage(
                "Checkout completed without penalty."
            );
        }


        /*
         * Refresh booking table.
         */
        await loadBookings();


        /*
         * Refresh selected lot occupancy.
         */
        await updateOccupancy();


        /*
         * Refresh dashboard occupancy.
         *
         * CHECKED_IN becomes COMPLETED,
         * therefore Occupied decreases.
         */
        await updateTotalOccupancy(
            Number(
                document.getElementById(
                    "totalSlots"
                ).textContent
            )
        );


    } catch (error) {

        console.error(error);


        showMessage(
            error.message,
            "error"
        );
    }
}


/* =====================================================
   SELECTED PARKING LOT OCCUPANCY
===================================================== */

document.getElementById(
    "bookingLot"
).addEventListener(
    "change",
    updateOccupancy
);


async function updateOccupancy() {

    const lotId =
        document.getElementById(
            "bookingLot"
        ).value;


    if (!lotId) {

        document.getElementById(
            "occupancyCount"
        ).textContent =
            "0";


        document.getElementById(
            "occupancyText"
        ).textContent =
            "Select a parking lot to view current occupancy.";


        return;
    }


    try {

        const response =
            await fetch(
                `${API}/parking-lots/${lotId}/occupancy`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load parking lot occupancy"
            );
        }


        const occupancy =
            await response.json();


        document.getElementById(
            "occupancyCount"
        ).textContent =
            occupancy;


        document.getElementById(
            "occupancyText"
        ).textContent =
            `${occupancy} vehicle(s) are currently checked in.`;


    } catch (error) {

        console.error(
            "Selected lot occupancy error:",
            error
        );
    }
}


/* =====================================================
   DATE FORMATTER
===================================================== */

function formatDate(dateString) {

    if (!dateString) {

        return "-";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =====================================================
   AUTOMATIC REFRESH
===================================================== */

setInterval(
    async () => {

        /*
         * Refresh booking table.
         */
        await loadBookings();


        /*
         * Refresh parking lot,
         * slot and dashboard data.
         */
        await loadParkingLots();


        /*
         * Refresh selected parking lot occupancy.
         */
        await updateOccupancy();


    },
    15000
);