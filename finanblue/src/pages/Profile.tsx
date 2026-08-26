import React, { useState } from 'react';
import { useApp } from '../context/AppContext.js';
import { Card, Button, Input, Notification } from '../components/shared/index.js';

export const Profile: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 pb-20 lg:pb-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Perfil</h1>
        <p className="text-neutral-600">Gestiona tu información personal</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <Notification type="success" message="Perfil actualizado exitosamente" />
      )}

      {/* Profile Section */}
      <Card padding="lg">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
              {profile.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">{profile.name}</h2>
              <p className="text-neutral-600">{profile.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Ingresos objetivo (mensual)"
                type="number"
                step="0.01"
                value={formData.monthlyIncomeGoal}
                onChange={(e) => setFormData({ ...formData, monthlyIncomeGoal: parseFloat(e.target.value) })}
              />

              <Input
                label="Monto de ahorro objetivo (mensual)"
                type="number"
                step="0.01"
                value={formData.monthlySavingsGoal}
                onChange={(e) => setFormData({ ...formData, monthlySavingsGoal: parseFloat(e.target.value) })}
              />

              <div className="flex gap-3">
                <Button onClick={handleCancel} variant="secondary">
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Guardar cambios
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Ingresos objetivo (mensual)</p>
                  <p className="text-lg font-bold text-neutral-900">S/ {formData.monthlyIncomeGoal.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="text-xs text-neutral-600 mb-1">Ahorro objetivo (mensual)</p>
                  <p className="text-lg font-bold text-neutral-900">S/ {formData.monthlySavingsGoal.toFixed(2)}</p>
                </div>
              </div>

              <Button onClick={() => setIsEditing(true)} variant="primary" className="w-full">
                Editar información
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Preferences */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Preferencias</h3>
        <div className="space-y-4">
          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm font-medium text-neutral-900 mb-1">Moneda</p>
            <p className="text-neutral-600">{profile.currency}</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm font-medium text-neutral-900 mb-1">Almacenamiento</p>
            <p className="text-sm text-neutral-600">Los datos se guardan localmente en tu navegador</p>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card padding="lg" className="bg-blue-50 border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">ℹ️ Acerca de FinanBlue</h3>
        <div className="space-y-2 text-sm text-neutral-700">
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Tipo:</strong> Aplicación 100% Frontend</p>
          <p><strong>Privacidad:</strong> Tus datos nunca salen de tu navegador</p>
          <p><strong>Persistencia:</strong> LocalStorage del navegador</p>
          <p className="pt-2">
            FinanBlue es una herramienta de gestión de finanzas personales diseñada para ayudarte a controlar tus ingresos, gastos, presupuestos y metas de ahorro.
          </p>
        </div>
      </Card>
    </div>
  );
};
