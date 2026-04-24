"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  _id: string;
  orderId: number;
  firstName: string;
  lastName: string;
  customerEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

type OrderStats = {
  pendingCount: number;
  pendingRevenue: number;
  acceptedCount: number;
  acceptedRevenue: number;
  rejectedCount: number;
};

type Pagination = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

const STORAGE_KEY = "admin_password";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSavedPassword(sessionStorage.getItem(STORAGE_KEY));
  }, []);

  const isAuthenticated = useMemo(
    () => Boolean(savedPassword),
    [savedPassword],
  );

  const fetchOrders = async (pageNumber: number) => {
    if (!savedPassword) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/orders?page=${pageNumber}&limit=10`, {
        headers: { "x-admin-password": savedPassword },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load orders");
      }

      setOrders(data.orders);
      setStats(data.stats);
      setPagination(data.pagination);
      setPage(data.pagination.page);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(1);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (!password.trim()) return;
    sessionStorage.setItem(STORAGE_KEY, password.trim());
    setSavedPassword(password.trim());
    setPassword("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSavedPassword(null);
    setOrders([]);
    setStats(null);
    setPagination(null);
  };

  const handleAction = async (orderId: number, action: "accept" | "reject") => {
    if (!savedPassword) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({ orderId, action }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to update order");
      }

      await fetchOrders(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: number) => {
    if (!savedPassword) return;
    const confirmed = window.confirm("Delete this order permanently?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": savedPassword,
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to delete order");
      }

      await fetchOrders(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8 shadow-lg border-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Access
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter the admin password to manage orders.
            </p>
            <div className="flex flex-col gap-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <Button onClick={handleLogin} className="bg-green-600">
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">
              Review, confirm, reject, or delete orders.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {error && (
          <Card className="p-4 border border-red-200 bg-red-50 text-red-700">
            {error}
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-0 shadow-sm">
            <p className="text-sm text-gray-500">Upcoming Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.pendingCount ?? 0}
            </p>
            <p className="text-sm text-gray-500">
              Total: Rs.{stats?.pendingRevenue ?? 0}
            </p>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <p className="text-sm text-gray-500">Fulfilled Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.acceptedCount ?? 0}
            </p>
            <p className="text-sm text-gray-500">
              Revenue: Rs.{stats?.acceptedRevenue ?? 0}
            </p>
          </Card>
          <Card className="p-5 border-0 shadow-sm">
            <p className="text-sm text-gray-500">Rejected Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats?.rejectedCount ?? 0}
            </p>
          </Card>
        </div>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
            {loading && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-900">
                      {order.orderId}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-semibold text-gray-900">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Totals</p>
                    <p className="font-semibold text-gray-900">
                      Rs.{order.totalPrice}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.totalItems} items
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`font-semibold capitalize ${
                        order.status === "accepted"
                          ? "text-green-600"
                          : order.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAction(order.orderId, "accept")}
                    disabled={loading}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleAction(order.orderId, "reject")}
                    disabled={loading}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(order.orderId)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    Address: {order.address.street}, {order.address.city},{" "}
                    {order.address.province}, {order.address.postalCode}
                  </p>
                  <p>Phone: {order.phone}</p>
                </div>
              </div>
            ))}

            {orders.length === 0 && !loading && (
              <p className="text-sm text-gray-500">No orders found.</p>
            )}
          </div>

          {pagination && (
            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fetchOrders(Math.max(1, pagination.page - 1))}
                  disabled={pagination.page <= 1 || loading}
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    fetchOrders(
                      Math.min(pagination.totalPages, pagination.page + 1),
                    )
                  }
                  disabled={pagination.page >= pagination.totalPages || loading}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
